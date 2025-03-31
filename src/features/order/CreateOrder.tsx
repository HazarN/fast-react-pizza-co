import { ActionFunctionArgs, Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { FormErrors } from '@app/models/FormErrors';
import Button from '@app/ui/Button';
import { isValidPhone } from '@app/utils/formValidation';
import { useAppSelector } from '@app/utils/reduxStore';
import { CreateOrderResponse } from '@models/CreateOrderResponse';
import { createOrder } from '@services/apiRestaurant';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const formErrors = useActionData() as FormErrors;

  const isSubmitting = navigation.state === 'submitting';

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const username = useAppSelector((state) => state.user.username);
  const firstName = username?.split(' ').at(0);

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
                {' '}
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='capitalize sm:basis-40'>Address</label>
          <div className='grow'>
            <input type='text' className='input w-full' name='address' required />
          </div>
        </div>

        <div className='mb-12 flex items-center gap-4'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
        </div>

        <div>
          <Button type='primary' disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
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
    priority: raw.priority === ('on' as unknown as boolean),
  };

  // Validation
  const errors: FormErrors = {};
  if (!isValidPhone(orderResponse.phone))
    errors.phone = 'Please provide a valid phone number, we might need to call you.';
  if (Object.keys(errors).length) return errors;

  const newOrder = await createOrder(orderResponse);

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
