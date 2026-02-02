import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item
const addFood = async (req, res) => {
    
    // Cloudinary upload ke baad file details req.file mein aati hain
    if (!req.file) {
        return res.json({ success: false, message: "Image upload failed" });
    }

    // AB HUM PATH (URL) SAVE KARENGE:
    // req.file.path mein Cloudinary ka live link hota hai
    let image_url = req.file.path; 

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_url // Pura URL database mein jayega
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added with Cloudinary URL" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// all food list (Isme koi change nahi chahiye)
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        // Ab hum fs.unlink use nahi karenge kyunki image local folder mein nahi hai
        // Note: Agar Cloudinary se bhi delete karna hai toh cloudinary.uploader.destroy lagta hai
        // Lekin abhi ke liye DB se hatana kaafi hai
        
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed from Database" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addFood, listFood, removeFood }

