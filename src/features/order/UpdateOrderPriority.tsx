import { ActionFunctionArgs, useFetcher } from 'react-router-dom';

import { updateOrder } from '@services/apiRestaurant';

import IOrder from '@models/IOrder';

import Button from '@ui/Buttons/Button';

type Props = {
  order: IOrder;
};
function UpdateOrderPriority({ order }: Props) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }: ActionFunctionArgs) {
  const data = { priority: true };

  console.log(params);

  await updateOrder(params.orderId as string, data);

  return null;
}

export default UpdateOrderPriority;
