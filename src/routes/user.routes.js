import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';
import { authorization, validation } from '../middlewares';
const router = Router();

router.post(
  '/',
  userCtrl.createUser,
);

export default router;
