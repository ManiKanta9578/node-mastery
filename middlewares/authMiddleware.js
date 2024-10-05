import jwt from "jsonwebtoken";

export const Auth = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];

        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;

        next();

    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
}


export const localVariables = (req, res, next) => {
    req.app.locals = {
        OTP: null,
        resetSession: false,
    }
    next();
};