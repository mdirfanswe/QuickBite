import foodModel from "../models/foodModel.js";
import fs from "fs";

// ===============================
// ADD FOOD ITEM CONTROLLER
// ===============================

const addFood = async (req, res) => {

  // Get uploaded image file name from multer
  // req.file comes from multer middleware
  let image_filename = `${req.file.filename}`;

  // Create a new food document using request data
  const food = new foodModel({
    name: req.body.name,           
    description: req.body.description, 
    price: req.body.price,        
    category: req.body.category,   
    image: image_filename,         
  });

  try {
    // Save food data into MongoDB
    await food.save();

    // Send success response to frontend
    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    // If error occurs, print error in terminal
    console.log(error);

    // Send error response
    res.json({ success: false, message: "Error" });
  }
};


// ===============================
// GET ALL FOOD ITEMS
// ===============================

const listFood = async (req, res) => {
  try {
    // Fetch all food items from database
    const foods = await foodModel.find({});

    // Send food list to frontend
    res.json({ success: true, data: foods });

  } catch (error) {
    console.log("Error");

    // Send error response
    res.json({ success: false, message: "Error" });
  }
};


// ===============================
// REMOVE FOOD ITEM
// ===============================

const removeFood = async (req, res) => {
  try {
    // Find food by ID sent from frontend
    const food = await foodModel.findById(req.body.id);

    // Delete image file from uploads folder
    fs.unlink(`uploads/${food.image}`, () => {});

    // Delete food data from MongoDB
    await foodModel.findByIdAndDelete(req.body.id);

    // Send success response
    res.json({ success: true, message: "Food removed" });

  } catch (error) {
    console.log(error);

    // Send error response
    res.json({ success: false, message: "Error" });
  }
};


// Export controllers to use in routes
export { addFood, listFood, removeFood };
