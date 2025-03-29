export default interface ICart {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  addIngredients: [];
  removeIngredients: [];
}
