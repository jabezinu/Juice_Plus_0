import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();

export const validateTokenHandler = expressAsyncHandler(async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
});


