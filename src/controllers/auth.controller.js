import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const signUp = async (req, res) => {
    const {username, email, password, roles} = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(roles => roles._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 // 24 hours
    })

    res.status(200).json({token})
}

export const signIn = async (req, res) => {
    res.json('signin')
}