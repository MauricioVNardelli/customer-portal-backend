import { Router } from 'express';

import { EnumController } from './controllers/EnumController';
import { AuthUserController } from './controllers/AuthUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateUserController, DetailUserController, UpdateUserController } from './controllers/UserController';

const router = Router();

router.post('/session', new AuthUserController().handle)

//-- users
router.post('/user', isAuthenticated, new CreateUserController().handle)
router.get('/user', isAuthenticated, new DetailUserController().handle)
router.put('/user', isAuthenticated, new UpdateUserController().handle)

//--Enum
router.get('/enum', isAuthenticated, new EnumController().handle);

export { router };