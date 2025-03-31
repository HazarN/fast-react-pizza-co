import { ICartItem } from '@models/ICartItem';
import { formatCurrency } from '@utils/formatters';

function OrderItem({ item }: React.PropsWithChildren<{ item: ICartItem }>) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className='py-3'>
      <div className='flex items-center justify-between text-sm'>
        <p>
          <span className='font-bold'>{quantity}&times;</span> {name}
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
