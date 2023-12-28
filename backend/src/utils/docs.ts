import { Request, Response } from "express";
import { User } from "../model/user";

export function getDocs(req: Request, res: Response) {
  const data = {
    swagger: "2.0",
    user: User.schema.obj,
  };
  console.log("getDocs() called", data);
  res.status(200).send({ data: data });
}
