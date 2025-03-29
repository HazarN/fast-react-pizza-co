import ICart from '@interfaces/ICart';

export default interface IOrder {
  id: string;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: ICart[];
}
