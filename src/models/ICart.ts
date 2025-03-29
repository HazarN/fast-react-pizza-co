export default interface ICart {
  items: ICartItem[];
}

export interface ICartItem {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  addIngredients: [];
  removeIngredients: [];
}
