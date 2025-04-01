import { useEffect } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';

import { getOrder } from '@services/apiRestaurant';

import { calcMinutesLeft, formatCurrency, formatDate } from '@utils/formatters';

import IOrder from '@models/IOrder';
import IPizza from '@models/IPizza';
import { type OrderParams } from '@models/OrderParams';

import OrderItem from '@features/order/OrderItem';
import UpdateOrderPriority from '@features/order/UpdateOrderPriority';

function Order() {
  const order = useLoaderData() as IOrder;
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } =
    order as IOrder;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();
  const menuData = fetcher.data as Array<IPizza>;

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, []);

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
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={menuData?.find((pizza) => pizza.id)?.ingredients || []}
          />
        ))}
      </ul>

      <div className='space-y-2 bg-stone-200 rounded-md py-4 px-6'>
        <p className='text-sm'>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className='text-sm'>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className='font-bold'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrderPriority order={order} />}
    </div>
  );
}

export const loader = async ({ params }: { params: OrderParams }) =>
  await getOrder(params.orderId as string);

export default Order;
