import { Router } from 'express';
const router = Router();

import * as ordersCtrl from '../controllers/orders.controller';
import { authorization } from '../middlewares';

router.get(
  '/',
  ordersCtrl.getOrders,
);

router.get(
  '/:orderId',
  ordersCtrl.getOrderById,
);

router.get(
  '/customer/:clientId',
  ordersCtrl.getOrderByCustomerId,
);

router.post(
  '/',
  ordersCtrl.createOrder,
);

router.put(
  '/:orderId',
  ordersCtrl.updateOrderById,
);

router.delete(
  '/:orderId',
  ordersCtrl.deleteOrderById,
);

export default router;
