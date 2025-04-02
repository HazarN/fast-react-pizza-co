import { formatCurrency } from '@utils/formatters';

import { ICartItem } from '@models/ICartItem';

import UpdateQuantity from '@features/cart/UpdateQuantity';

import DeleteButton from '@ui/Buttons/DeleteButton';

function CartItem({ item }: React.PropsWithChildren<{ item: ICartItem }>) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0 '>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-4'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>

        <div className='flex items-center gap-2'>
          <UpdateQuantity pizzaId={item.pizzaId} />
          <DeleteButton pizzaId={item.pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
