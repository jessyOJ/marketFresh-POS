import mongoose from "mongoose"
const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users",
            required: true,
        },
        items: [
            {
                itemId: {
                    type: mongoose.Schema.Types.ObjectId, // Reference to Product model
                    ref: "items",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                category: {
                    type: String,
                    required: true,
                },
              
            },
        ],
        bills:[{
          subTotal:{
            type:Number,
            required:true
        },
        tax:{
            type:Number,
            required:true
        },
        totalAmount:{
            type:String,
            required:true
        },
        }
          
        ],
    },
    {
        timestamps: true, 
    }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
