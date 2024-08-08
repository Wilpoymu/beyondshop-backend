import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';
import { authorization } from '../middlewares';
const router = Router();

router.post(
  '/signup',
  [authorization.verifyToken, authorization.isAdmin],
  userCtrl.createUser,
);

export default router;
