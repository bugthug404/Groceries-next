import { Router } from "express";
import {
  createGroceryItem,
  deleteGroceryItem,
  getAllGroceryItem,
  updateGroceryItem,
} from "./groceryItem.service";

const groceriesRouter = Router();

groceriesRouter.get("/list", getAllGroceryItem);
groceriesRouter.post("/add", createGroceryItem);
groceriesRouter.put("/edit/:id", updateGroceryItem);
groceriesRouter.delete("/delete/:id", deleteGroceryItem);

export default groceriesRouter;
