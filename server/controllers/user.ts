import * as jwt from 'jsonwebtoken';
import { User } from 'models/user';

import BaseCtrl from './base';

class UserCtrl extends BaseCtrl {
  model = [
    { id: '1', username: 'admin', password: 'admin', role: 'admin' },
    { id: '2', username: 'tester', password: 'tester', role: 'user' },
  ] as User[];

  login = (req, res) => {
    const { username, password } = req.body;
    const user = this.model.find(
      (x) => x.username.toLowerCase() === username.toLowerCase() && x.password === password
    );
    if (!user) {
      return res.status(403).json({ err: 'Username or password is incorrect' });
    }
    const token = jwt.sign({ user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
    return res.status(200).json({
      ...this.omitPassword(user),
      token,
    });
  };

  // Get by id
  get = async (req, res) => {
    try {
      const obj = this.model.find((x) => x.id === req.params.id);
      const user = this.omitPassword(obj);
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  getAll = async (req, res) => {
    try {
      const docs = this.model.map((u) => this.omitPassword(u));
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Update by id
  update = async (req, res) => {
    try {
      const index = this.model.findIndex((x) => x.id === req.params.id);
      if (req.body.password) {
        this.model[index] = req.body;
      } else {
        const user: User = this.model[index];
        this.model[index] = { ...user, username: req.body.username, role: req.body.role };
      }
      const userWithoutPassword = this.omitPassword(this.model[index]);
      res.status(200).json(userWithoutPassword);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  omitPassword = (user: User) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };
}

export default UserCtrl;
