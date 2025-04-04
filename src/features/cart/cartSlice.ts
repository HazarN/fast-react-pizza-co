import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICartItem } from '@models/ICartItem';

type CartState = {
  items: ICartItem[];
};

const initialState: CartState = {
  items: new Array<ICartItem>(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state: CartState, action: PayloadAction<ICartItem>) => {
      state.items.push(action.payload);
    },

    removePizza: (state: CartState, action: PayloadAction<number>) => {
      state.items = state.items.filter((pizza) => pizza.pizzaId !== action.payload);
    },

    incrementNoOfPizzas: (state: CartState, action: PayloadAction<number>) => {
      const pizza = state.items.find((pizza) => pizza.pizzaId === action.payload);

      if (!pizza) return;

      pizza.quantity++;
      pizza.totalPrice = pizza.unitPrice * pizza.quantity;
    },

    decrementNoOfPizzas: (state: CartState, action: PayloadAction<number>) => {
      const pizza = state.items.find((pizza) => pizza.pizzaId === action.payload);

      if (!pizza) return;

      pizza.quantity--;
      pizza.totalPrice = pizza.unitPrice * pizza.quantity;

      if (pizza.quantity === 0) cartSlice.caseReducers.removePizza(state, action);
    },

    clearCart: (state: CartState) => {
      state.items = [];
    },
  },
});

export const { addPizza, removePizza, clearCart, decrementNoOfPizzas, incrementNoOfPizzas } =
  cartSlice.actions;
export default cartSlice.reducer;
