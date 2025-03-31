import { useAppDispatch } from '@utils/reduxStore';

import { removePizza } from '@features/cart/cartSlice';

import Button from '@ui/Buttons/Button';

type Props = {
  pizzaId: number;
};
function DeleteButton({ pizzaId }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Button type='small' onClick={() => dispatch(removePizza(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteButton;
