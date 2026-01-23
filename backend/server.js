import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// 1. Database Connection
connectDB();

// 2. Middleware (Humesha Routes se upar rakhein)
app.use(express.json());
app.use(cors());

// 3. Static Files (Yahan bhi ek slash '/' miss hai)
app.use("/images", express.static('uploads')) 

// 4. API Endpoints
app.use("/api/food", foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API is working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})




