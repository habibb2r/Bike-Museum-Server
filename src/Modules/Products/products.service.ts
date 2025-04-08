import { TProduct } from './products.interface';
import { Product } from './products.model';

const createProduct = async (payload: TProduct): Promise<TProduct> => {
  const result = await Product.createOrUpdate(payload);
  return result;
};

const getProducts = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const excludeFields = [
    'searchTerm',
    'page',
    'limit',
    'sortOrder',
    'sortBy',
    'fields',
  ];
  excludeFields.forEach((key) => delete queryObj[key]);
  const searchTerm = query.searchTerm || ' ';
  const searchFields = ['name', 'brand', 'category'];

  const searchQuery = Product.find({
    $or: searchFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const filterQuery = searchQuery.find(queryObj);

  const page = Number(query?.page || 1);
  const limit = Number(query?.limit || 10);
  const skip = (page - 1) * limit;
  const paginatedQuery = filterQuery.skip(skip).limit(limit);

  let sortStr;

  if (query?.sortBy && query.sortOrder) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder;
    sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
  }
  const sortQuery = paginatedQuery.sort(sortStr);

  let fields = '-__v';
  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ');
  }

  const result = await sortQuery.select(fields);

  return result;
};

const getSingleProduct = async (ProductId: string) => {
  const result = await Product.findById(ProductId);
  return result;
};

const updateProduct = async (ProductId: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(ProductId, payload, {
    new: true,
  });
  return result;
};

const deleteProduct = async (ProductId: string) => {
  const deleteSingleProduct = await Product.findOneAndUpdate(
    { id: ProductId },
    { isDeleted: true },
    { new: true },
  );
  return deleteSingleProduct;
};

export const ProductServices = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
// const deleteSpecificProduct = async (
//   productId: mongoose.Types.ObjectId | string,
// ) => {
//   const ObajectId = mongoose.Types.ObjectId;
//   const checkDeleted = await Product.findOne({
//     _id: new ObajectId(productId),
//     isDeleted: false,
//   });

//   if (checkDeleted) {
//     const result = await Product.updateOne(
//       { _id: new ObajectId(productId), isDeleted: false },
//       { isDeleted: true },
//       { new: true, runValidators: true },
//     );
//     return result;
//   } else {
//     throw new Error('Resource not found');
//   }
// };
