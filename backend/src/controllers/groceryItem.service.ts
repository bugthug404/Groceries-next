import { Request, Response } from "express";
import { Types } from "mongoose";
import { authRequest } from "../middleware/auth-request";
import mongoose from "mongoose";
import { GroceryItem } from "../model/grocery-item";
import { groceryItemSchema } from "../utils/joi-edit-user-schema";

export async function getAllGroceryItem(req: Request, res: Response) {
  authRequest(req, res, () => {
    GroceryItem.find({}, null, {
      limit: 10,
      sort: { createdAt: -1 },
    })
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(500).send({ error: err });
      });
  });
}

export async function createGroceryItem(req: Request, res: Response) {
  const item = req.body;
  const userid = req.body.decodedToken.userId;
  console.log("item", item);
  console.log("userid", userid);
  if (!item) {
    return res.status(400).send({ error: "Item is required" });
  }
  try {
    const data = await GroceryItem.create({
      ...item,
      userId: new Types.ObjectId(userid),
    });
    return res
      .status(200)
      .send({ data: data, message: "Item created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export async function updateGroceryItem(req: Request, res: Response) {
  const validData = groceryItemSchema.validate(req.body);
  if (validData.error)
    return res.status(400).send({ error: validData.error.details[0].message });

  console.log("updateGroceryItem called");
  const item = req.body;
  const userid = req.body.decodedToken.userId;
  delete item.decodedToken;

  console.log("item", item);
  console.log("userid", userid);

  if (!item) {
    res.status(400).send({ error: "Item is required" });
    return;
  }
  try {
    const data = await GroceryItem.updateOne(
      { _id: new Types.ObjectId(item._id) },
      { $set: { ...item } }
    );
    console.log("data ==== ", data);
    return res
      .status(200)
      .send({ data: data, message: "Item updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
}

export async function deleteGroceryItem(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Item id is required" });
    return;
  }
  try {
    const data = await GroceryItem.deleteOne({
      _id: new Types.ObjectId(id),
    });
    return res
      .status(200)
      .send({ data: data, message: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
}
