import express from 'express';
import { ProductController } from './products.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getSpecificProduct);
router.put('/:productId', ProductController.updateSpecificProduct);
router.delete('/:productId', ProductController.deleteSpecificProduct);

export const ProductRoutes = router;
