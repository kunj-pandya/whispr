import express from "express"
import { getuser, signin, signout, singup, updateProfile } from "../controllers/user.controller.js"

const router = express.Router();

router.post("/sign-up", singup);
router.post("/sign-in", signin);
router.get("/sign-out", signout);
router.get("/me", getuser);
router.put("/update-profile", updateProfile);

export default router;
