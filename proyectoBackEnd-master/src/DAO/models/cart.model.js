import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    thumbnails: [String],
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'productModel' },
        quantity: Number,
    }],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
