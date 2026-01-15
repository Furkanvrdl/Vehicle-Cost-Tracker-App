import type { Request, Response } from "express";
import { pool } from "../db";
import type { AuthRequest } from "../middleware/auth.middleware";

// Controller to get expenses for the authenticated user
export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const result = await pool.query("SELECT * FROM expenses WHERE user_id=$1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Controller to get expenses by ID for the authenticated user
export const getExpenseById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const expenseId = req.params.id;
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id=$1 AND id=$2",
      [userId, expenseId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to add a new expense for the authenticated user
export const addExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { title, amount } = req.body;

    if (!title || !amount === undefined) {
      return res.status(400).json({ message: "Name and amount required" });
    }
    const result = await pool.query(
      "INSERT INTO expenses (user_id, title, amount) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Controller to delete an expense for the authenticated user
export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const expenseId = req.params.id;
    await pool.query("DELETE FROM expenses WHERE id=$1 AND user_id=$2", [
      expenseId,
      userId,
    ]);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
