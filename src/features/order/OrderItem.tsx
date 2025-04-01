import { formatCurrency } from '@utils/formatters';

import { ICartItem } from '@models/ICartItem';

type Props = {
  item: ICartItem;
  isLoadingIngredients: boolean;
  ingredients: string[] | undefined;
};
function OrderItem({ item, ingredients, isLoadingIngredients }: React.PropsWithChildren<Props>) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className='py-3'>
      <div className='flex items-center justify-between text-sm'>
        <p className='flex flex-col gap-1 justify-center'>
          <span className='font-bold'>
            {quantity}&times; {name}
          </span>
          <span className='text-xs md:text-sm italic capitalize'>
            {isLoadingIngredients ? 'loading...' : ingredients!.join(', ')}
          </span>
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
