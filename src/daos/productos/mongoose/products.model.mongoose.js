import { Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';

export const productsSchema = new Schema({
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: String, enum: ['activo', 'inactivo'], required: true },
    stock: { type: Number, min: 0, required: true },
    category: { type: String, required: true }
}, {
    strict: 'throw',
    versionKey: false
});
