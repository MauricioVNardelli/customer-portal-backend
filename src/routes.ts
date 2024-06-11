import { Router } from 'express';

import { DetailEnumController } from './controllers/enum/DetailEnumController';

import { CreateUserController, DetailUserController } from './controllers/UserController';
import { AuthUserController } from './controllers/AuthUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

router.post('/session', new AuthUserController().handle)

//-- users
router.post('/user', isAuthenticated, new CreateUserController().handle)
router.get('/user', isAuthenticated, new DetailUserController().handle)

//--Enum
router.get('/enum', isAuthenticated, new DetailEnumController().handle);

export { router };