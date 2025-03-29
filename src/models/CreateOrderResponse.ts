export type CreateOrderResponse = {
  customer: string;
  phone: string;
  address: string;
  priority?: boolean;
  cart: string;
};
