import { Schema } from 'mongoose';
import { randomUUID } from "node:crypto";

const cartSchema = new Schema(
    {
        _id: { type: String, default: randomUUID },
        userId: { type: String, required: true }, // Nuevo campo para almacenar el ID del usuario
        _productos: {
            type: [
                {
                    _id: { type: String, ref: "productos" },
                    quantity: { type: Number, min: 1, default: 1 },
                },
            ],
            default: [],
        },
    },
    {
        strict: "throw",
        versionKey: false,
    }
);

export default cartSchema;
