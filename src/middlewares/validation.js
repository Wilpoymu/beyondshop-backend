import jwt from 'jsonwebtoken';
import { ROLES } from '../models/Role';
import User from '../models/User';
import config from '../config';

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: 'The user already exists' });

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: 'The email already exists' });

  next();
};
export const checkRolesExist = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res
          .status(404)
          .json({ message: `Role ${req.body.roles[i]} does not exist` });
      }
    }
  }

  next();
};

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, config.SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.user = user;

    next();
  });
};
