import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';

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

