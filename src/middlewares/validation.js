import jwt from 'jsonwebtoken';
import { ROLES } from '../models/Role';
import User from '../models/User';
import config from '../config';
import Customer from '../models/Customer';

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json(['The user already exists']);

  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).json(['The email already exists']);

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

export const checkDuplicateCustomers = async (req, res, next) => {
  const customer = await Customer.findOne({ document: req.body.document });
  if (customer) return res.status(400).json(['The customer already exists']);

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

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};
