import { Router } from 'express';
const router = Router();

import * as ordersCtrl from '../controllers/orders.controller';
import { authorization } from '../middlewares';

router.get(
  '/',
  [authorization.verifyToken, authorization.isAdmin],
  ordersCtrl.getOrders,
);

router.get(
  '/:orderId',
  [authorization.verifyToken, authorization.isAdmin],
  ordersCtrl.getOrderById,
);

router.get(
  '/customer/:clientId',
  [authorization.verifyToken, authorization.isAdmin],
  ordersCtrl.getOrderByCustomerId,
);

router.post(
  '/',
  [authorization.verifyToken, authorization.isAdmin],
  ordersCtrl.createOrder,
);

router.put(
  '/:orderId',
  [authorization.verifyToken, authorization.isAdmin],
  ordersCtrl.updateOrderById,
);

router.delete(
  '/:orderId',
  authorization.verifyToken,
  ordersCtrl.deleteOrderById,
);

export default router;
