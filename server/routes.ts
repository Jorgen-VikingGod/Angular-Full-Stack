import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import EventCtrl from './controllers/event';
import { authorize } from './utils';

function setRoutes(app): void {
  const router = express.Router();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const eventCtrl = new EventCtrl();

  // Cats
  router.route('/cats').get(authorize(), catCtrl.getAll);
  router.route('/cats/count').get(authorize(), catCtrl.count);
  router.route('/cat').post(authorize(), catCtrl.insert);
  router.route('/cat/:id').get(authorize(), catCtrl.get);
  router.route('/cat/:id').put(authorize(), catCtrl.update);
  router.route('/cat/:id').delete(authorize(), catCtrl.delete);

  // Users
  router.route('/register').post(userCtrl.register);
  router.route('/login').post(userCtrl.login);
  router.route('/refresh').post(userCtrl.refresh);
  router.route('/users').get(authorize('admin'), userCtrl.getAll);
  router.route('/users/count').get(authorize('admin'), userCtrl.count);
  router.route('/user').post(authorize('admin'), userCtrl.insert);
  router.route('/user/:id').get(authorize(['user', 'admin']), userCtrl.get);
  router.route('/user/:id').put(authorize(['user', 'admin']), userCtrl.update);
  router.route('/user/:id').delete(authorize('admin'), userCtrl.delete);

  // Events
  router.route('/events').get(authorize(), eventCtrl.getAll);
  router.route('/events/count').get(authorize(), eventCtrl.count);
  router.route('/event').post(authorize(), eventCtrl.insert);
  router.route('/event/:id').get(authorize(), eventCtrl.get);
  router.route('/event/:id').put(authorize(), eventCtrl.update);
  router.route('/event/:id').delete(authorize(), eventCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api/v1', router);
}

export default setRoutes;
