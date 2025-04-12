import { ProductServices } from './products.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createProduct = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ProductServices.createProduct(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Successfully created Product",
    data: result,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getProducts(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched Products",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
<<<<<<< HEAD
=======
  // console.log(req.params);
>>>>>>> 47d342e7c05e8623cb795981dfb7827a92bc5d01
  const id = req.params.productId;
  const result = await ProductServices.getSingleProduct(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched single Product",
    data: result,
  });
});

const getProductsWithFilter = catchAsync(async (req, res) => {
  
  const result = await ProductServices.getProductsWithFilterFromDB();
  sendResponse(res, {
    success: true,
    message: 'Category Retrieved successfully ',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const payload = req.body;
  const result = await ProductServices.updateProduct(id, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully updated Product",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.ProductId;
  const result = await ProductServices.deleteProduct(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully deleted Product",
    data: result,
  });
});


export const ProductController = {
  createProduct,
  getProducts,
  getSingleProduct,
  getProductsWithFilter,
  deleteProduct,
  updateProduct
};
