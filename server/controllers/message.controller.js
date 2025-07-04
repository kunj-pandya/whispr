import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.js"

export const getAllUsers = catchAsyncError(async (req, res, next) => { });
export const getMessages = catchAsyncError(async (req, res, next) => { });
export const sendMessage = catchAsyncError(async (req, res, next) => { });
