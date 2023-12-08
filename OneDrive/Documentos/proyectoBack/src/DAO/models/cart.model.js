import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    thumbnails: [String],
})

export const cartModel = mongoose.model(cartCollection, cartSchema)