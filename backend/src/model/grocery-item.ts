import mongoose from "mongoose";

const groceryItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantityInStock: { type: Number, required: true },
  },
  { timestamps: true }
);

export const GroceryItem = mongoose.model(
  "GroceryItem",
  groceryItemSchema,
  "grocery_items"
);
