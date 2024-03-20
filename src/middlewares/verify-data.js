import { request, response } from 'express';
import User from '../users/user.model.js';

export const validateUserPut = async (req, res, next) => {
    const userLog = req.user;
    const { user } = req.body;
    const seeUser = await User.findOne({ user: user });
    if (!seeUser) {
        next();
    }
    if (seeUser) {
        if (seeUser.id == userLog.id) {
            next();
        } else {
            return res.status(400).json({
                msg: "The user already exists in the DB"
            });
        }
    }
}