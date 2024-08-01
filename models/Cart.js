const mongoose = require('mongoose');

const CartShema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    products: [
        {
            cartItem: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
            },
            quantity:{
                type: Number,
                default:1
            }
        }
    ]
    
}, {timestamps: true });

module.exports = mongoose.model("Cart", CartShema);  // "Cart" is the name of the model and "CartSchema" is the schema
