import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
} from "../controllers/expenses.controller";

const router = Router();

router.get("/", authenticate, getExpenses);
router.get("/:id", authenticate, getExpenseById);
router.post("/", authenticate, addExpense);
router.delete("/:id", authenticate, deleteExpense);

export default router;
