import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Token generator
const createToken = (id) => {
return jwt.sign({ id }, process.env.JWT_SECRET);
}

// 1. LOGIN USER (Direct Login, No OTP)
const loginUser = async (req, res) => {
const { email, password } = req.body;
try {
const user = await userModel.findOne({ email });

}

// 2. REGISTER USER (Direct Signup)
const registerUser = async (req, res) => {
const { name, password, email } = req.body;
try {
const exists = await userModel.findOne({ email });
if (exists) return res.json({ success: false, message: "User already exists" });

}

// 3. VERIFY OTP (Not needed anymore)
const verifyOTP = async (req, res) => {
res.json({ success: false, message: "OTP disabled" });
}

export { loginUser, registerUser, verifyOTP };
