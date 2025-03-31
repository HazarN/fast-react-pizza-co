import { useAppDispatch } from '@app/utils/reduxStore';
import Button from '@ui/Buttons/Button';
import { decrementNoOfPizzas, incrementNoOfPizzas } from './cartSlice';

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
