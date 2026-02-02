import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    // OTP jodne ke liye ye niche wali do lines add ki hain
    otp: { type: String }, 
    isVerified: { type: Boolean, default: false }
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;

