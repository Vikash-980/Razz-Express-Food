import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import nodemailer from "nodemailer"; // 1. Nodemailer import kiya

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // TLS ke liye false hi rahega
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// placing user order for frontend
const placeOrder = async (req, res) => {
     const frontend_url = "https://razz-express-food-frontend.onrender.com";
    // const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// 2. VERIFY ORDER - Yahan Email bhejenge Success hone par
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    console.log("Verify Call Received:", { orderId, success });

    try {
        if (success == "true" || success == true) {
            // 1. Order status update
            const order = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
            
            // 2. Wahi Purana Logic: Direct Address se email uthana
            const userEmail = order.address.email;
            console.log("Bhai, is email par bhej raha hoon:", userEmail);

            if (userEmail) {
                const itemsList = order.items.map(item => 
                    `<li>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>`
                ).join('');

                const mailOptions = {
                    from: `"Razz Express Food" <${process.env.EMAIL_USER}>`,
                    to: userEmail,
                    subject: 'Order Confirmed! ✅ - Razz Express Food',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 12px;">
                            <h1 style="color: #27ae60; text-align: center;">Razz Express Food</h1>
                            <p>Hi <b>${order.address.firstName}</b>, Aapka order confirm ho gaya hai!</p>
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                <h3>Order Details:</h3>
                                <ul>${itemsList}</ul>
                                <p><strong>Total:</strong> ₹${order.amount}</p>
                                <p><strong>Delivery Address:</strong> ${order.address.street}, ${order.address.city}</p>
                            </div>
                            <p style="text-align: center; margin-top: 20px;">Dhananyabad!</p>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log("RESULT: Purana function kaam kar gaya, Email sent!");
            }

            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log("Verify Error:", error);
        res.json({ success: false, message: "Error" });
    }
}


const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }
