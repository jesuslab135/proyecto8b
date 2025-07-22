import { Router } from 'express';
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from './ordersController';
import { validateData } from '../../middlewares/validationMiddleware';
import { insertOrderWithItemsSchema, updateOrderSchema } from '../../db/ordersSchema';

const router = Router();

router.post(
  '/',validateData(insertOrderWithItemsSchema),
  createOrder
);

router.get('/', listOrders);
router.get('/:id', getOrder);
router.put('/:id', validateData(updateOrderSchema), updateOrder);

export default router;