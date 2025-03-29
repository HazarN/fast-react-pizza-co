import { ActionFunctionArgs, Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { FormErrors } from '@app/models/FormErrors';
import { isValidPhone } from '@app/utils/formValidation';
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

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method='POST'>
        <div>
          <label>First Name</label>
          <input type='text' name='customer' required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type='tel' name='phone' required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type='text' name='address' required />
          </div>
        </div>

        <div>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority'>Want to yo give your order priority?</label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
        </div>

        <div>
          <button disabled={isSubmitting}>{isSubmitting ? 'Placing order...' : 'Order now'}</button>
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
    errors.phone = 'Please provide a valid phone number to be able to contact you';
  if (Object.keys(errors).length) return errors;

  const newOrder = await createOrder(orderResponse);

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
