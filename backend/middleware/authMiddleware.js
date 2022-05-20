import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers['auth-token'] &&
    req.headers['auth-token'].startsWith('Bearer')
  ) {
    try {
      token = req.headers['auth-token'].split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token not valid!');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token!');
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
