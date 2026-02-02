import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";

// --- BREVO CONFIGURATION START ---
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // TLS ke liye false
    auth: {
        user: process.env.EMAIL_USER, // Brevo Login ID
        pass: process.env.EMAIL_PASS  // Brevo SMTP Key
    },
    connectionTimeout: 10000, // 10 seconds timeout fix
    greetingTimeout: 10000,
});
// --- BREVO CONFIGURATION END ---

// 1. LOGIN USER - OTP Email with Styling
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.otp = otp;
        await user.save();

        // --- SAJAWAT WALA EMAIL START ---
        const mailOptions = {
            from: `"Razz Express Food" <${process.env.EMAIL_USER}>`, // Brevo registered email
            to: email,
            subject: 'Login Verification Code - Razz Express Food',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #ff4321; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">Razz Express Food</h1>
                </div>
                <div style="padding: 20px; text-align: center;">
                    <h2 style="color: #333;">Welcome Back!</h2>
                    <p style="color: #666; font-size: 16px;">Apne account mein login karne ke liye niche diya gaya OTP code use karein:</p>
                    <div style="margin: 30px 0;">
                        <span style="font-size: 36px; font-weight: bold; color: #ff4321; letter-spacing: 5px; border: 2px dashed #ff4321; padding: 10px 20px; border-radius: 5px; background-color: #fff5f3;">
                            ${otp}
                        </span>
                    </div>
                    <p style="color: #999; font-size: 14px;">Ye code 10 minute ke liye valid hai. Kisi ke saath share na karein.</p>
                </div>
                <div style="background-color: #f9f9f9; padding: 15px; text-align: center; color: #777; font-size: 12px;">
                    <p>Swaad ka naya thikana - Razz Express Food</p>
                    <p>&copy; 2026 Razz Express Food Team</p>
                </div>
            </div>
            `
        };
        // --- SAJAWAT WALA EMAIL END ---

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Email Error: ", error);
                return res.json({ success: false, message: "Email sending failed. Please check Brevo credentials on Render." });
            } else {
                console.log("Email sent: " + info.response);
                res.json({ success: true, message: "OTP sent to your email" });
            }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Login" });
    }
}

// 2. REGISTER USER (Same as before)
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) return res.json({ success: false, message: "User already exists" });

        if (!validator.isEmail(email)) return res.json({ success: false, message: "Valid email required" });
        if (password.length < 8) return res.json({ success: false, message: "Strong password required" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.json({ success: true, message: "Account created! Now please Login." });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Registration Error" });
    }
}

// 3. VERIFY OTP (Same as before)
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });

        if (user.otp === otp) {
            user.otp = null; 
            await user.save();

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token, message: "Login Successful" });
        } else {
            res.json({ success: false, message: "Invalid OTP code" });
        }
    } catch (error) {
        res.json({ success: false, message: "Verification Error" });
    }
}

export { loginUser, registerUser, verifyOTP }