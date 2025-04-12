import { model, Schema } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    user: {type:Schema.Types.ObjectId, ref:'User'},
    product: { type: Schema.Types.ObjectId, required: true , ref: 'Product'},
    email: { type: String, required: true },
    transactionId: {type: Number, required: true},
    totalPrice: { type: Number, required: true, default:0 },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    estimatedDeliveryDate: { type: Date, required: true , default:new Date()},
    status: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'cancelled'],
      default:"pending"
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
