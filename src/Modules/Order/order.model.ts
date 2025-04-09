import { model, Schema } from "mongoose"
import type { OrderModel, TOrder } from "./order.interface"

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price must be a positive number"],
    },
  },
  {
    timestamps: true,
  },
)

export const Order = model<TOrder, OrderModel>("Order", orderSchema)
