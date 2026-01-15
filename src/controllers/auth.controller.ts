import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db"; // Assuming you have a db.ts file exporting a configured pg Pool
import dotenv from "dotenv"; // Import dotenv to manage environment variables

dotenv.config();

// Controller for user registration
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const result = await pool.query(
    "INSERT INTO users(email,password) VALUES($1,$2) RETURNING id",
    [email, hashedPassword]
  );
  const userId = result.rows[0].id;

  // Create JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return res.status(201).json({ userId, token });
};

// Controller for user login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // Create JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  res.json({ token });
};
