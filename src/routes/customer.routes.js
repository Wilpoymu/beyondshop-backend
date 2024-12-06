import { Router } from 'express';
import * as customerController from '../controllers/customer.controller';

import { authorization, validation } from '../middlewares';

const router = Router();

router.get(
  '/',
  customerController.getCustomers,
);

router.get(
  '/:customerId',
  customerController.getCustomerById,
);

router.post(
  '/',
  [
    validation.checkDuplicateCustomers,
  ],
  customerController.createCustomer,
);

router.put(
  '/:customerId',
  customerController.updateCustomerById,
);

router.delete(
  '/:customerId',
  customerController.deleteCustomerById,
);

export default router;
