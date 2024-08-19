import { Router } from 'express';
const router = Router();

import * as productsCtrl from '../controllers/products.controller';
import { authorization } from '../middlewares';

router.get('/', productsCtrl.getProducts);

router.post(
  '/',
  [authorization.verifyToken, authorization.isAdmin],
  productsCtrl.createProduct,
);

router.get('/:productId', productsCtrl.getProductById);

router.put(
  '/:productId',
  authorization.verifyToken,
  productsCtrl.updateProductById,
);

router.delete(
  '/:productId',
  [authorization.verifyToken, authorization.isAdmin],
  productsCtrl.deleteProductById,
);

export default router;
