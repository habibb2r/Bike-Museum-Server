import { TProduct } from './products.interface';
import { Product } from './products.model';
import mongoose from 'mongoose';

const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

const getAllProductsFromDB = async (searchTerm: string) => {
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

const getSpecificProductFromDB = async (
  productId: mongoose.Types.ObjectId | string,
) => {
  const ObajectId = mongoose.Types.ObjectId;
  const result = await Product.findOne(
    { _id: new ObajectId(productId) },
    { isDeleted: 0, __v: 0 },
  );
  return result;
};

const updateSpecificProductFromDB = async (
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

const deleteSpecificProductFromDB = async (
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
  createProductIntoDB,
  getAllProductsFromDB,
  getSpecificProductFromDB,
  updateSpecificProductFromDB,
  deleteSpecificProductFromDB,
};
