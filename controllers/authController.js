import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { username, password, email, profile } = req.body;

        let existUsername = await UserModel.findOne({ username });
        if (existUsername) {
            return res.status(400).json({ error: 'Please use unique username' });
        }

        let existEmail = await UserModel.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ error: 'Please use unique email' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        let hashedPasswrod = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPasswrod,
            email,
            profile: profile || ""
        })

        await user.save();

        return res.status(201).json({ msg: 'User registered successfully' });

    } catch (error) {
        console.log("Error in registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: 'Username not found' });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).send({ error: 'Incorrect password' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).send({
            msg: 'Login Successfully!',
            username: user.username,
            token
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};