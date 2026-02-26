import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//! Placing user order from frontend
const placeOrder= async (req, res) =>{

  const frontend_url = "http://localhost:5173"

  try {
    //! Creating the new order
    const newOrder = new orderModel({
      userId:req.body.userId,
      items:req.body.items,
      amount:req.body.amount,
      address:req.body.address
    })
    await newOrder.save(); //! save order in db
    await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}}); //! After placing order clear the user cart
    //! Create the stripe payment link
    const line_items = req.body.items.map((item)=>({
      price_data:{
        currency:"inr",
        product_data:{
          name:item.name
        },
        unit_amount:item.price*100*80
      },
      quantity:item.quantity
    }))
    //! Push the delivery charges
    line_items.push({
      price_data:{
        currency:"inr",
        product_data:{
          name:"Delivery Charges"
        },
        unit_amount:2*100*80
      },
      quantity:1
    })

    //! Create session for line item
    const session = await stripe.checkout.sessions.create({
      line_items:line_items,
      mode:'payment',
      success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })

    res.json({success:true,session_url:session.url})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

const verifyOrder = async (req, res) =>{
  const {orderId, success} = req.body;
  try {
    if(success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {payment:true});
      res.json({success:true, message:"Paid"});
    }
    else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Not Paid"});
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
    
  }
}

//! To verify the order this is not the prfect way the perfect way is paybhooks
//! Here we are used temporary payment system
export {placeOrder, verifyOrder}