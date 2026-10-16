import { Schema } from "mongoose"
import { model, models } from "mongoose"

export const productsSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    imageUrl: { type: String, trim: true },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["판매중", "예약중", "거래완료"],
      default: "판매중",
    },
  },
  {
    timestamps: true,
  },
)

export const Product = models.Product || model("Product", productsSchema)
