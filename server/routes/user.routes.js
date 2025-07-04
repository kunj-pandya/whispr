import express from "express"
import { getuser, signin, signout, singup, updateProfile } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", singup);
router.post("/sign-in", signin);
router.get("/sign-out", isAuthenticated, signout);
router.get("/me", isAuthenticated, getuser);
router.put("/update-profile", isAuthenticated, updateProfile);

export default router;
