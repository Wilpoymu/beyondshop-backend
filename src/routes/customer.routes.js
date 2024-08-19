import { Router } from 'express';
import * as customerController from '../controllers/customer.controller';

import { authorization } from '../middlewares';

const router = Router();

router.get(
  '/',
  [authorization.verifyToken, authorization.isAdmin],
  customerController.getCustomers,
);

router.get(
  '/:customerId',
  [authorization.verifyToken, authorization.isAdmin],
  customerController.getCustomerById,
);

router.post(
  '/',
  [authorization.verifyToken, authorization.isAdmin],
  customerController.createCustomer,
);

router.put(
  '/:customerId',
  [authorization.verifyToken, authorization.isAdmin],
  customerController.updateCustomerById,
);

router.delete(
  '/:customerId',
  [authorization.verifyToken, authorization.isAdmin],
  customerController.deleteCustomerById,
);

export default router;
