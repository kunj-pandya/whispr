import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWTToken } from "../utils/jwtToken.js";
import { v2 as cloudinary } from "cloudinary";

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

export const updateProfile = catchAsyncError(async (req, res, next) => {
    const { fullName, email } = req.body;
    if (fullName?.trim().length === 0 || email?.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: "Fullname and Email can't be empty.",
        });
    }
    const avatar = req?.files?.avatar;
    let cloudinaryResponse = {};

    if (avatar) {
        try {
            const oldAvaterPublicId = req.user?.avatar?.public_id;
            if (oldAvaterPublicId && oldAvaterPublicId.length > 0) {
                await cloudinary.uploader.destroy(oldAvaterPublicId)
            }
            cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath, {
                folder: "CHAT_APP_USERS_AVATARS",
                transformation: [
                    { width: 300, height: 300, crop: "limit" },
                    { quality: "auto" },
                    { fetch_format: "auto" },
                ]
            })
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to upload avatar. Please try again later."
            });
        }
    }

    let data = {
        fullName,
        email,
    }
    if (avatar && cloudinaryResponse?.public_id && cloudinaryResponse?.secure_url) {
        data.avatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }
    console.log("Cloudinary Upload Response:", cloudinaryResponse);
    console.log("Received avatar file:", avatar);

    let user = await User.findByIdAndUpdate(req.user._id, data, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        user,
    });
});

