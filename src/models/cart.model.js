import { Schema } from "mongoose";
import { randomUUID } from "node:crypto";

const cartSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    bebidas: {
      type: [
        {
          _id: { type: String, ref: "bebidas" },
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
