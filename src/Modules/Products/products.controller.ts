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
  const result = await ProductServices.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched Products",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const id = req.params.ProductId;
  const result = await ProductServices.getSpecificProduct(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched single Product",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.ProductId;
  const payload = req.body;
  const result = await ProductServices.updateSpecificProduct(id, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully updated Product",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.ProductId;
  const result = await ProductServices.deleteSpecificProduct(id);

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
