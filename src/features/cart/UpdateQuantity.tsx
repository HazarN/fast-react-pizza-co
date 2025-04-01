import { useAppDispatch } from '@utils/reduxStore';

import { decrementNoOfPizzas, incrementNoOfPizzas } from '@features/cart/cartSlice';

import Button from '@ui/Buttons/Button';

type Props = {
  pizzaId: number;
};
function UpdateQuantity({ pizzaId }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className='flex gap-1 items-center'>
      <Button type='circle' onClick={() => dispatch(incrementNoOfPizzas(pizzaId))}>
        +
      </Button>
      <Button type='circle' onClick={() => dispatch(decrementNoOfPizzas(pizzaId))}>
        -
      </Button>
    </div>
  );
}

export default UpdateQuantity;
