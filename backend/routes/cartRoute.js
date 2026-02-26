import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js'

const cartRouter = express.Router();

//! An endpoint is simply:
// A specific URL + HTTP method where the frontend talks to the backend

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/get",authMiddleware,getCart);

export default cartRouter;
