import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { User } from './../models/user';
import BaseCtrl from './base';

class UserCtrl extends BaseCtrl {
  model = [
    {
      id: '1',
      username: 'admin',
      password: '$2y$10$ZkIggXw/dzic90j5xexyIeT38JcVJiEJz4Em1NSjHPztVHnftMzoi',
      role: 'admin',
    },
    {
      id: '2',
      username: 'tester',
      password: '$2y$10$gJM8fKJDkVdayCjGYNTFzuKmA2nz2xZ9CamagGI5yTqORIIYgvGMa',
      role: 'user',
    },
  ] as User[];

  register = async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const user = this.model.find((x) => x.username.toLowerCase() === username.toLowerCase());
      if (user) {
        return res.status(403).json({ error: 'User already exists' });
      } else {
        const saltedPassword = bcrypt.hashSync(password, 10);
        const user: User = new User();
        user.username = username;
        user.password = saltedPassword;
        user.role = role;
        this.model.push(user);
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
        return res.status(200).json({ token });
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = this.model.find((x) => x.username.toLowerCase() === username.toLowerCase());
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
          return res.status(200).json({ token });
        } else {
          return res.status(401).json({ error: 'Authentication error' });
        }
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  refresh = async (req, res) => {
    try {
      const { username } = req.body;
      const user = this.model.find((x) => x.username.toLowerCase() === username.toLowerCase());
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
        res.status(200).json({ token });
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Update by id
  update = async (req, res) => {
    try {
      const index = this.model.findIndex((x) => x.id === req.params.id);
      if (req.body.password) {
        this.model[index] = { ...req.body, password: bcrypt.hashSync(req.body.password, 10) };
      } else {
        const user: User = this.model[index];
        this.model[index] = { ...user, username: req.body.username, role: req.body.role };
      }
      res.status(200).json(this.model[index]);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export default UserCtrl;
