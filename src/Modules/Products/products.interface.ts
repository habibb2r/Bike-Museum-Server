/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric' | 'sports';
  photo?:string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface TProductModel extends Model<TProduct> {
  createOrUpdate(data: TProduct): Promise<TProduct>;
}
