import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';

export const verifyUser = async (req, res, next) => {
    try {
        const { username } = req.method === 'GET' ? req.query : req.body;
        if (!username) {
            return res.status(400).send({ error: 'username is required!' });
        }

        let user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: 'user not found' });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
};

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

export async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) return res.status(501).send({ error: "Invalid UserName" });

        const user = await UserModel.findOne({ username });

        if (!user) return res.status(501).send({ error: "Couldn't find the user" });

        const { password, ...rest } = Object.assign({}, user.toJSON());

        return res.status(201).send(rest);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.user;

        if (!userId) {
            return res.status(400).send({ error: 'User ID is required!' });
        }

        const body = req.body;

        let updatedUser = await UserModel.findByIdAndUpdate(userId, body, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found' });
        }

        return res.status(200).send({ message: 'User record updated successfully.', user: updatedUser });

    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
}

export const generateOTP = async (req, res) => {

    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP });

}

export const verifyOTP = async (req, res) => {
    const { code } = req.query;
    if (parseInt(code) === parseInt(req.app.locals.OTP)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ Msg: 'Verified Successfully!' });
    }
    return res.status(400).send({ error: 'Invalid OTP' });
}

export const createResetSession = async (req, res) => {
    if (req.app.locals.createResetSession) {
        return res.status(201).send({ flag: req.app.locals.createResetSession });
    }
    return res.status(440).send({ error: 'Session exprired!' });
}