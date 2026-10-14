import { Schema } from "mongoose";
import { model, models } from "mongoose";

export const productsSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    imageUrl: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

export const Product = models.Product || model("Product", productsSchema);
