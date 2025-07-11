import { Router } from 'express';
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsController';
import { validateData } from '../../middlewares/validationMiddleware';

import {
  createProductSchema,
  updateProductSchema,
} from '../../db/productsSchema';
import { verifyAdmin, verifyToken } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post(
  '/',
  verifyToken,
  verifyAdmin,
  validateData(createProductSchema),
  createProduct
);
router.put(
  '/:id',
  verifyToken,
  verifyAdmin,
  validateData(updateProductSchema),
  updateProduct
);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

export default router;