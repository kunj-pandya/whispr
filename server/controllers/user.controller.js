import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWTToken } from "../utils/jwtToken.js";

export const singup = catchAsyncError(async (req, res, next) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required details.",
        });
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format.",
        });
    }
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long.",
        });
    }

    const isEmailAlreadyUsed = await User.findOne({ email });

    if (isEmailAlreadyUsed) {
        return res.status(400).json({
            success: false,
            message: "Email is alredy registered.",
        });
    }

    // Password Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        avatar: {
            public_id: "",
            url: "",
        },
    });
    generateJWTToken(user, "User registered successfully", 201, res);
});


export const signin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide email and password.",
        });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format.",
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials."
        });
    }

    // (Hash)Password Comparison- Stroed in database. 
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials."
        });
    }
    generateJWTToken(user, "User logged in successfully", 200, res);
});

export const signout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "developmennt" ? true : false,

    }).json({
        success: true,
        message: "User logged out successfully.",
    });
});

export const getuser = catchAsyncError(async (req, res, next) => {
    // we are getting user id from (isAuthenticated) => req.user = user;
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user,
    });
});

export const updateProfile = catchAsyncError(async (req, res, next) => { });

