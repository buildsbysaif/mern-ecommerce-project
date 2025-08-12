import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verifying the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Finding the user by the ID that was stored in the token
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Moving on to the next function
    } catch (error) {
      console.error(error); // This will log the actual JWT error
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, admin };