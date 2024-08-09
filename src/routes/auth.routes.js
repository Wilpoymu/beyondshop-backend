import { Router } from 'express';

const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import { validation } from '../middlewares';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

router.post(
  '/signup',
  validation.validateSchema(registerSchema),
  [validation.checkDuplicateUsernameOrEmail, validation.checkRolesExist],
  authCtrl.signUp,
);

router.post('/signin', validation.validateSchema(loginSchema), authCtrl.signIn);

router.post('/logout', authCtrl.logout);

router.get('/verify', authCtrl.verifyToken);

router.get('/profile', validation.authRequired, authCtrl.profile);


export default router;
