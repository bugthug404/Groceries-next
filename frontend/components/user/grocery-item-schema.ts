import { z } from "zod";

export const groceryItemSchema = z.object({
  name: z.string().min(1).max(100),
  category: z.string().min(1),
  price: z.string().min(1).max(100000),
  quantityInStock: z.string().min(1).max(100000),
});
