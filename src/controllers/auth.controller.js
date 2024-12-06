import User from '../models/User';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../libs/jwt';
import config from '../config';

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((roles) => roles._id);
    } else {
      const role = await Role.findOne({ name: 'user' });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = await createAccessToken({ id: savedUser._id });

    res.status(200).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      token: token, // Return token in response
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      'roles',
    );

    if (!userFound) return res.status(400).json({ message: 'User not found' });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password,
    );

    if (!matchPassword)
      return res.status(401).json({ message: 'Invalid password' });

    const token = await createAccessToken({ id: userFound._id });
    res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      token: token, // Return token in response
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ token: null }); // Invalidate the token by setting it to null
};

export const verifyToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, config.SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: 'Unauthorized' });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.userId); // Use req.userId instead of req.user.id
  if (!userFound) return res.status(400).json({ message: 'User not found' });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
