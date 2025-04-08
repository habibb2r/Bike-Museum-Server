import express from 'express';
import { ProductController } from './products.controller';
import validateRequest from '../../middlewares/validateRequest';
import { productValidation } from './products.validation';
import verifyAdmin from '../../middlewares/verifyAdmin';

const router = express.Router();

router.post(
  '/create-product', verifyAdmin,
  validateRequest(productValidation.productValidationSchema),
  ProductController.createProduct,
);
router.put('/:productId', ProductController.updateProduct);
router.get('/:productId', ProductController.getSingleProduct);
router.get('/', ProductController.getProducts);
router.delete('/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
