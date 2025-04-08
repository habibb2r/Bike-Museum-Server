import { ProductServices } from './products.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

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
  console.log(req.params);
  const id = req.params.productId;
  const result = await ProductServices.getSingleProduct(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched single Product",
    data: result,
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
  deleteProduct,
  updateProduct
};
