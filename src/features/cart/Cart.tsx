import { useAppDispatch, useAppSelector } from '@app/utils/reduxStore';

import CartItem from '@features/cart/CartItem';
import { clearCart } from '@features/cart/cartSlice';
import EmptyCart from '@features/cart/EmptyCart';

import Button from '@app/ui/Buttons/Button';
import LinkButton from '@app/ui/Buttons/LinkButton';

function Cart() {
  const cart = useAppSelector((state) => state.cart.items);
  const username = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='py-3 px-4'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className='mt-6 space-x-4'>
        <Button to='/order/new' type='primary'>
          Order pizzas
        </Button>

        <Button type='secondary' onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
