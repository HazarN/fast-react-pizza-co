import { ICartItem } from '@models/ICartItem';
import Button from '@ui/Button';
import { formatCurrency } from '@utils/formatters';

function CartItem({ item }: React.PropsWithChildren<{ item: ICartItem }>) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0 '>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-4'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>

        <Button type='small'>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
