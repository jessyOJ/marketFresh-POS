import express from "express";
import Cart from "../models/cartModel.js"; // Adjust the path to your Cart model

const router = express.Router();
router.get("/cart", async (req, res) => {
  try {
      const userId = req.user.id; // Extract user ID from decoded token
      const cartItems = await Cart.find({ userId }); // Fetch cart items for the user
      res.status(200).json(cartItems);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch cart items" });
  }
});


// Get cart by userId
router.get('/getCartByUserId/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch cart data for the specified userId
    const cart = await Cart.findOne({ userId })
      .populate('items.itemId') // Populate item details from the referenced "items" model
      .exec();

    if (!cart) {
      return res.status(404).send('Cart not found for this user.');
    }

    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



export default router; 