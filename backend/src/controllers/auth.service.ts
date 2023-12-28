import { Request, Response } from "express";
import { User } from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { signUpSchema } from "../utils/joi-signup-schema";
import { loginSchema } from "../utils/joi-login-schema";

export async function signUp(req: Request, res: Response) {
  const validData = signUpSchema.validate(req.body);
  if (validData.error)
    return res.status(400).send({ error: validData.error.details[0].message });

  const { firstName, lastName, email, password } = validData.value;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(400).send({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  })
    .then((result) => {
      const token = jwt.sign(
        {
          email: result.email,
          userId: result._id.toString(),
        },
        process.env.JWT_SECRET!
      );
      res.status(201).send({ user: result, token });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err.message });
    });
}

export async function login(req: Request, res: Response) {
  const validData = loginSchema.validate(req.body);
  if (validData.error)
    return res.status(400).send({ error: validData.error.details[0].message });

  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((exists) => {
      if (!exists) {
        return res.status(400).send({ error: exists });
      }

      bcrypt
        .compare(password, exists.password)
        .then((match) => {
          if (!match) {
            return res.status(400).send({ error: "Invalid password" });
          }

          const token = jwt.sign(
            {
              email: exists.email,
              userId: exists._id.toString(),
            },
            process.env.JWT_SECRET!
          );

          res.status(200).send({ user: exists, token });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: "Something went wrong" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Something went wrong" });
    });
}
