import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';
import { authorization, validation } from '../middlewares';
const router = Router();

router.post(
  '/',
  [
    authorization.verifyToken,
    authorization.isAdmin,
    validation.checkRolesExist,
  ],
  userCtrl.createUser,
);

export default router;
