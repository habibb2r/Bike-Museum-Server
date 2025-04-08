import express from 'express';
import { ProductController } from './products.controller';
import validateRequest from '../../middlewares/validateRequest';
import { productValidation } from './products.validation';

const router = express.Router();

router.post(
  '/create-product',
  validateRequest(productValidation.productValidationSchema),
  ProductController.createProduct,
);
router.get('/:productId', ProductController.getSingleProduct);
router.get('/', ProductController.getProducts);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
