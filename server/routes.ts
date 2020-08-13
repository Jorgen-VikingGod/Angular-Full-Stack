import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import EventCtrl from './controllers/event';
import validateToken from './utils';

function setRoutes(app): void {
  const router = express.Router();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const eventCtrl = new EventCtrl();

  // Cats
  router.route('/cats').get(validateToken, catCtrl.getAll);
  router.route('/cats/count').get(validateToken, catCtrl.count);
  router.route('/cat').post(validateToken, catCtrl.insert);
  router.route('/cat/:id').get(validateToken, catCtrl.get);
  router.route('/cat/:id').put(validateToken, catCtrl.update);
  router.route('/cat/:id').delete(validateToken, catCtrl.delete);

  // Users
  router.route('/register').post(userCtrl.register);
  router.route('/login').post(userCtrl.login);
  router.route('/refresh').post(userCtrl.refresh);
  router.route('/users').get(validateToken, userCtrl.getAll);
  router.route('/users/count').get(validateToken, userCtrl.count);
  router.route('/user').post(validateToken, userCtrl.insert);
  router.route('/user/:id').get(validateToken, userCtrl.get);
  router.route('/user/:id').put(validateToken, userCtrl.update);
  router.route('/user/:id').delete(validateToken, userCtrl.delete);

  // Events
  router.route('/events').get(validateToken, eventCtrl.getAll);
  router.route('/events/count').get(validateToken, eventCtrl.count);
  router.route('/event').post(validateToken, eventCtrl.insert);
  router.route('/event/:id').get(validateToken, eventCtrl.get);
  router.route('/event/:id').put(validateToken, eventCtrl.update);
  router.route('/event/:id').delete(validateToken, eventCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api/v1', router);
}

export default setRoutes;
