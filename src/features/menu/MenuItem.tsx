import { ICartItem } from '@app/models/ICartItem';
import Button from '@app/ui/Buttons/Button';
import DeleteButton from '@app/ui/Buttons/DeleteButton';
import { useAppDispatch, useAppSelector } from '@app/utils/reduxStore';
import { addPizza } from '@features/cart/cartSlice';
import IPizza from '@models/IPizza';
import { formatCurrency } from '@utils/formatters';

function MenuItem({ pizza }: React.PropsWithChildren<{ pizza: IPizza }>) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useAppDispatch();

  const isItemInCart = useAppSelector((state) =>
    state.cart.items.some((item) => item.pizzaId === pizza.id)
  );

  const handleAddPizza = () => {
    const cartItem: ICartItem = {
      pizzaId: pizza.id,
      name,
      unitPrice,
      totalPrice: unitPrice,
      quantity: 1,
    };

    dispatch(addPizza(cartItem));
  };

  return (
    <li className='flex gap-4'>
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'grayscale' : ''}`} />
      <div className='flex flex-col gap-1 py-2 grow'>
        <p className='font-semibold'>{name}</p>
        <p className='text-sm italic text-stone-500 capitalize'>{ingredients.join(', ')}</p>

        <div className='flex items-center justify-between mt-auto'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm uppercase'>Sold out</p>
          )}

          {isItemInCart ? (
            <DeleteButton pizzaId={pizza.id} />
          ) : (
            <Button type='small' disabled={soldOut} onClick={handleAddPizza}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
