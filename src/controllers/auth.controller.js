import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import { createAccessToken } from '../libs/jwt';

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

    res.cookie('token', token);
    res.status(200).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      password: savedUser.password,
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

    res.cookie('token', token);
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
