import { model, Schema } from 'mongoose';
import { ProductModel, TProduct } from './products.interface';

const ProductSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [30, 'Product name must be at most 30 characters'],
      required: [true, 'Product name is required'],
    },
    brand: {
      type: String,
      trim: true,
      maxlength: [30, 'Product brand must be at most 30 characters'],
      required: [true, 'Product brand is required'],
    },
    price: {
      type: Number,
      minlength: [1, 'Product price must be at least 1'],
      required: [true, 'Product price is required'],
    },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message: '{VALUE} is not a valid product category',
      },
      required: [true, 'Product category is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    quantity: {
      type: Number,
      minlength: [1, 'Product quantity must be at least 1'],
      required: [true, 'Product quantity is required'],
    },
    inStock: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
ProductSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
ProductSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Product = model<TProduct, ProductModel>('Product', ProductSchema);
