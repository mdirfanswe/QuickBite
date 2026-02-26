import userModel from "../models/userModel.js"

// Add items to user card
// const addToCart = async (req,res) => {
//   try {
//     let userData = await userModel.findById(req.body.userId);
//     let cartData = await userData.cartData;
//     if(!cartData[req.body.itemId]){
//       cartData[req.body.itemId] = 1;
//     }
//     else {
//       cartData[req.body.itemId] += 1;
//     }
//     await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//     res.json({success:true,message:"Added to cart"});
//   } catch (error) {
//     console.log(error);
//     res.json({success:false, message:"Error"});
    
//   }
// }

//! Add items to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Find user
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Get existing cart
    let cartData = userData.cartData;

    // If item not exists → add 1
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // Save updated cart
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Item added successfully",
      cartData
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding item" });
  }
};

// Remove item from user cart
const removeFromCart = async (req,res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Removed From Cart"});
  } catch (error) {
    console.log("Error");
    res.json({success:false,message:"Error"});
  }
}

// fetch user cart data
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


export {addToCart, removeFromCart, getCart}