import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signUpSchema } from "../utils/joi-signup-schema";
import { loginSchema } from "../utils/joi-login-schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function signUp(req: Request, res: Response) {
  const validData = signUpSchema.validate(req.body);
  if (validData.error) {
    return res.status(400).json({ error: validData.error.details[0].message });
  }

  const { firstName, lastName, email, password } = validData.value;

  try {
    const exists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (exists) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        email: result.email,
        userId: result.id.toString(), // Assuming your Prisma User model has an 'id' field (likely Int)
      },
      process.env.JWT_SECRET!
    );

    return res.status(201).json({ user: result, token });

  } catch (err: any) {
    console.error("Error during signup:", err);
    return res.status(500).json({ error: err.message || "Something went wrong during signup" });
  } finally {
    await prisma.$disconnect();
  }
}

export async function login(req: Request, res: Response) {
  const validData = loginSchema.validate(req.body);
  if (validData.error) {
    return res.status(400).json({ error: validData.error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const exists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!exists) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, exists.password);

    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: exists.email,
        userId: exists.id.toString(), // Assuming your Prisma User model has an 'id' field (likely Int)
      },
      process.env.JWT_SECRET!
    );

    return res.status(200).json({ user: exists, token });

  } catch (err: any) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: err.message || "Something went wrong during login" });
  } finally {
    await prisma.$disconnect();
  }
}