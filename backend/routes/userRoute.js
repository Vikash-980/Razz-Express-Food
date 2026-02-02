import express from "express"
import { loginUser, registerUser, verifyOTP } from "../controllers/userController.js" // 1. verifyOTP ko bhi import kiya

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/verify", verifyOTP) // 2. Ye naya route add kiya OTP verify karne ke liye

export default userRouter;
