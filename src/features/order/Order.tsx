// Test ID: IIDSAT
import { useLoaderData } from 'react-router-dom';

import IOrder from '@app/models/IOrder';
import { calcMinutesLeft, formatCurrency, formatDate } from '@app/utils/formatters';
import { type OrderParams } from '@models/OrderParams';
import { getOrder } from '@services/apiRestaurant';
import OrderItem from './OrderItem';

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } =
    order as IOrder;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className='px-4 py-6 space-y-8'>
      <div className='flex flex-wrap justify-between items-center gap-2'>
        <h2 className='text-xl font-semibold'>Order #{id} Status</h2>

        <div className='space-x-2'>
          {priority && (
            <span className='rounded-full bg-red-500 px-3 py-1 text-red-50 tracking-wide uppercase font-semibold text-sm'>
              Priority
            </span>
          )}
          <span className='rounded-full bg-green-500 px-3 py-1 text-green-50 tracking-wide uppercase font-semibold text-sm'>
            {status} order
          </span>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-2 bg-stone-200 py-4 px-6 rounded-md'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-xs'>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className='divide-y divide-stone-200 border-y'>
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className='space-y-2 bg-stone-200 rounded-md py-4 px-6'>
        <p className='text-sm'>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className='text-sm'>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className='font-bold'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export const loader = async ({ params }: { params: OrderParams }) =>
  await getOrder(params.orderId as string);

export default Order;
