import { Model } from 'mongoose';

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TOrder = {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
};

export type ProductModel = Model<TProduct>;
