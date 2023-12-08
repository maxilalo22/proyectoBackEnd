import mongoose from 'mongoose'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: Number,
    price: Number,
    stock: Number,
    thumbnail: String,
})

export const productModel = mongoose.model(productCollection, productSchema)