import { ActionFunctionArgs, Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { createOrder } from '@services/apiRestaurant';

import { formatCurrency } from '@utils/formatters';
import { isValidPhone } from '@utils/formValidation';
import store, { useAppDispatch, useAppSelector } from '@utils/reduxStore';

import { CreateOrderResponse } from '@models/CreateOrderResponse';
import { FormErrors } from '@models/FormErrors';

import { clearCart } from '@features/cart/cartSlice';
import EmptyCart from '@features/cart/EmptyCart';

import Button from '@ui/Buttons/Button';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const {
    username,
    address,
    position,
    status: addressStatus,
    error: addressError,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const formErrors = useActionData() as FormErrors;
  const isSubmitting = navigation.state === 'submitting';
  const cart = useAppSelector((state) => state.cart.items);
  const firstName = username?.split(' ').at(0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isLoadingAddress = addressStatus === 'loading';

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl mb-8 font-semibold'>Ready to order? Let's go!</h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='capitalize sm:basis-40'>First Name</label>
          <input
            type='text'
            className='input grow'
            name='customer'
            required
            defaultValue={firstName}
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='capitalize sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input type='tel' className='input w-full' name='phone' required />
            {formErrors?.phone && (
              <p className='mt-2 rounded-lg text-xs p-2 bg-red-100 text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex gap-2 sm:flex-row sm:items-center'>
          <label className='capitalize sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              className='input w-full'
              name='address'
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
            {addressStatus === 'error' && (
              <div>
                <p className='mt-2 rounded-lg text-xs p-2 bg-red-100 text-red-700'>
                  {addressError}
                </p>
              </div>
            )}
          </div>

          {!position?.latitude && !position?.longitude && (
            <span className='absolute right-[2px] top-[2px] md:right-[5px] md:top-[5px] z-50'>
              <Button
                type='small'
                disabled={isLoadingAddress}
                onClick={(e?: React.FormEvent) => {
                  e!.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className='mb-12 flex items-center gap-4'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority.toString()}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={position ? `${position.latitude}, ${position.longitude}` : ''}
          />
        </div>

        <div>
          <Button type='primary' disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? 'Placing order...' : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData) as unknown as CreateOrderResponse;

  const orderResponse = {
    ...raw,
    cart: JSON.parse(raw.cart),
    priority: raw.priority === ('true' as unknown as boolean),
  };

  // Validation
  const errors: FormErrors = {};
  if (!isValidPhone(orderResponse.phone))
    errors.phone = 'Please provide a valid phone number, we might need to call you.';
  if (Object.keys(errors).length) return errors;

  const newOrder = await createOrder(orderResponse);

  // clear the previous cart
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
