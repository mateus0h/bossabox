import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import TagController from './app/controllers/TagController';
import ToolController from './app/controllers/ToolController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', validateUserStore, UserController.store);
routes.post('/session', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/tags', TagController.index);
routes.get('/tags/:id', TagController.show);
routes.post('/tags', TagController.store);
routes.put('/tags/:id', TagController.update);
routes.delete('/tags/:id', TagController.delete);

routes.get('/tools', ToolController.index);
routes.get('/tools/:id', ToolController.show);
routes.post('/tools', ToolController.store);
routes.put('/tools/:id', ToolController.update);
routes.delete('/tools/:id', ToolController.delete);

export default routes;
