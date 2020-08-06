import * as jwt from 'jsonwebtoken';
import { User } from 'models/user';

import BaseCtrl from './base';

class UserCtrl extends BaseCtrl {
  model = [
    { id: '1', username: 'admin', password: 'TestTeam', role: 'admin' },
    { id: '2', username: '1es-tester', password: 'TestTeam', role: 'user' },
  ] as User[];

  login = (req, res) => {
    const { username, password } = req.body;
    const user = this.model.find((x) => x.username === username && x.password === password);
    if (!user) {
      return res.status(403).json({ err: 'Username or password is incorrect' });
    }
    const token = jwt.sign({ user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
    return res.status(200).json({
      ...this.omitPassword(user),
      token,
    });
  };

  getAll = async (req, res) => {
    try {
      const docs = this.model.map((u) => this.omitPassword(u));
      res.status(200).json(docs);
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
