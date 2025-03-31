import { ICartItem } from '@app/models/ICartItem';

export default interface IOrder {
  id: string;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: ICartItem[];
}
