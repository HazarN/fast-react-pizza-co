import { ICartItem } from '@app/models/ICartItem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartState = {
  cart: ICartItem[];
};

const initialState: CartState = {
  cart: new Array<ICartItem>(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state: CartState, action: PayloadAction<ICartItem>) => {
      state.cart.push(action.payload);
    },
    removePizza: (state: CartState, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((pizza) => pizza.pizzaId !== action.payload);
    },
    incrementNoOfPizzas: (state: CartState, action: PayloadAction<number>) => {
      const pizza = state.cart.find((pizza) => pizza.pizzaId === action.payload);

      if (!pizza) return;

      pizza.quantity++;
      pizza.totalPrice = pizza.unitPrice * pizza.quantity;
    },
    decrementNoOfPizzas: (state: CartState, action: PayloadAction<number>) => {
      const pizza = state.cart.find((pizza) => pizza.pizzaId === action.payload);

      if (!pizza) return;

      if (pizza.quantity > 1) {
        pizza.quantity--;
        pizza.totalPrice = pizza.unitPrice * pizza.quantity;
      } else {
        state.cart = state.cart.filter((pizza) => pizza.pizzaId !== action.payload);
      }
    },
    clearCart: (state: CartState) => {
      state.cart = [];
    },
  },
});

export const { addPizza, removePizza, clearCart, decrementNoOfPizzas, incrementNoOfPizzas } =
  cartSlice.actions;
export default cartSlice.reducer;
