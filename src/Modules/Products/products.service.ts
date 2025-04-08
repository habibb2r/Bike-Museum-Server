import { TProduct } from './products.interface';
import { Product } from './products.model';
import mongoose from 'mongoose';

const createProduct= async (productData: TProduct) => {
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

const getAllProducts = async (searchTerm: any) => {
  if (searchTerm) {
    const result = await Product.find(
      {
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { category: new RegExp(searchTerm, 'i') },
          { brand: new RegExp(searchTerm, 'i') },
        ],
      },
      { isDeleted: 0, __v: 0 },
    );
    return result;
  } else {
    const result = await Product.find({}, { isDeleted: 0, __v: 0 });
    return result;
  }
};

const getSpecificProduct = async (
  productId: mongoose.Types.ObjectId | string,
) => {
  const ObajectId = mongoose.Types.ObjectId;
  const result = await Product.findOne(
    { _id: new ObajectId(productId) },
    { isDeleted: 0, __v: 0 },
  );
  return result;
};

const updateSpecificProduct = async (
  productId: mongoose.Types.ObjectId | string,
  updateData: Partial<TProduct>,
) => {
  const ObajectId = mongoose.Types.ObjectId;
  const result = await Product.findOneAndUpdate(
    { _id: new ObajectId(productId) },
    updateData,
    { new: true, runValidators: true },
  );
  return result;
};

const deleteSpecificProduct = async (
  productId: mongoose.Types.ObjectId | string,
) => {
  const ObajectId = mongoose.Types.ObjectId;
  const checkDeleted = await Product.findOne({
    _id: new ObajectId(productId),
    isDeleted: false,
  });

  if (checkDeleted) {
    const result = await Product.updateOne(
      { _id: new ObajectId(productId), isDeleted: false },
      { isDeleted: true },
      { new: true, runValidators: true },
    );
    return result;
  } else {
    throw new Error('Resource not found');
  }
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
};
