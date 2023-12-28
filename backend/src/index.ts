import express from "express";
import Cors from "cors";
import mongoose from "mongoose";
import { authRequest } from "./middleware/auth-request";
import * as dotenv from "dotenv";
import { connectToMongoDB } from "./utils/db";
import authRouter from "./controllers/auth.controller";
import groceriesRouter from "./controllers/groceryitem.controller";

dotenv.config();
mongoose.set("strictQuery", false);
const app = express();
const port = process.env.PORT || 3009;
app.use(
  Cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
// add json middleware
app.use(express.json());

connectToMongoDB();

app.get("/", (req, res) =>
  res.status(200).send({
    data: `server says : get request on time : ${new Date().getTime()}`,
  })
);

app.use("/", authRouter);
app.use("/groceries", authRequest, groceriesRouter);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
