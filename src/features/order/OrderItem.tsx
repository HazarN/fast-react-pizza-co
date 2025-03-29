import { formatCurrency } from '@app/utils/formatters';

function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: React.PropsWithChildren<{ item: any; isLoadingIngredients: boolean; ingredients: any }>) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
