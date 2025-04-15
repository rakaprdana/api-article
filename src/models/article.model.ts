import { model, Schema } from "mongoose";

const articleSchema = new Schema({
  title: { type: String, required: [true, "Title is required"], unique: true },
  author: {
    type: String,
    require: [true, "Writer's name is required"],
  },
  date: { type: Date, default: Date.now },
  category: { type: String, required: [true, "Category is required"] },
  location: { type: String, required: [true, "Location is required"] },
  article: { type: String, required: [true, "Article is required"] },
  image: [{ type: String }],
  is_deleted: { type: Boolean, default: false },
});

export const Article = model("Article", articleSchema);
