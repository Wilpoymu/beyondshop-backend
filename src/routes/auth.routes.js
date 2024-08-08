import { Router } from 'express';

const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import { validation } from '../middlewares';

router.post('/signup', [validation.checkDuplicateUsernameOrEmail, validation.checkRolesExist], authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

export default router;
