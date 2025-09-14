import User from "../models/User.js"
import jwt from 'jsonwebtoken';
import { protect } from "../middleware/authMiddleware.js";

const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    
    try{
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400); 
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password, 
        });

        if (user) {
            res.status(201).json({ 
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error){res.status(res.statusCode || 500).json({ message: error.message });
        res.status(res.statusCode || 500).json({ message: error.message });
    };
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d', 
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict', 
            maxAge: 30 * 24 * 60 * 60 * 1000, 
        });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
        } else {
            res.status(401); 
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0), 
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getCurrentUser = (req, res) => {
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};


export {registerUser, loginUser, logoutUser, getCurrentUser};