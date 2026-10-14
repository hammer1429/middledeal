import { Schema } from "mongoose";
import { model, models } from "mongoose";

export const noticeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Notice = models.Notice || model("Notice", noticeSchema);
