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

    res.cookie('token', token, {
      httpOnly: true, // Solo accesible a través de HTTP, no desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS si estás en producción
      sameSite: 'lax', // Permite el envío de cookies en solicitudes de sitios cruzados
    });
    res.status(200).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
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
    res.cookie('token', token, {
      sameSite: 'lax', // Permite el envío de cookies en solicitudes del mismo sitio
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS si estás en producción
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });
    res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: 'User not found' });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

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
