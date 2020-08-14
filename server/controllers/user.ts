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
      const user = this.model.find((x) => x.id === req.user.id);
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

  changePassword = async (req, res) => {
    try {
      const { username } = req.user;
      const { oldPassword, newPassword } = req.body;
      const user = this.model.find((x) => x.username.toLowerCase() === username.toLowerCase());
      bcrypt.compare(oldPassword, user.password, (err, valid) => {
        if (err) {
          return res.status(400).json({ error: err });
        } else {
          if (!valid) {
            return res.status(404).json({ error: 'User not found' });
          } else {
            const index = this.model.indexOf(user);
            this.model[index] = { ...user, password: bcrypt.hashSync(newPassword, 10) };
            res.status(200).json(this.model[index]);
          }
        }
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Update by id
  update = async (req, res) => {
    try {
      const index = this.model.findIndex((x) => x.id === req.params.id);
      const user: User = this.model[index];
      this.model[index] = { ...user, username: req.body.username, role: req.body.role };
      res.status(200).json(this.model[index]);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export default UserCtrl;
