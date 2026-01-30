import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path"; // 1. Path module ko import kiya

// app config
const app = express();
const port = process.env.PORT || 4000;

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); 

// 2. Static Files (Path.resolve use kiya taaki Render ko folder sahi se mile)
app.use("/images", express.static(path.join(path.resolve(), 'uploads'))) 

// API Endpoints
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API is working")
})

app.listen(port, () => {
    // Localhost console log ko dynamic rakha
    console.log(`Server Started on Port: ${port}`)
})