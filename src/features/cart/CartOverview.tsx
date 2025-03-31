import { Link } from 'react-router-dom';

import { formatCurrency } from '@utils/formatters';
import { useAppSelector } from '@utils/reduxStore';

function CartOverview() {
  const noOfPizzas = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const totalPrice = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.totalPrice, 0)
  );

  if (!noOfPizzas) return null;

  return (
    <div className='flex items-center justify-between bg-stone-800 text-stone-200 font-semibold uppercase px-4 py-4 sm:px-6 text-sm md:text-base'>
      <p className='text-stone-300 space-x-4 sm:space-x-6'>
        <span>{noOfPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>

      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
