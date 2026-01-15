//Here I defined the Express app, routes, and middleware.
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import expenseRoutes from "./routes/expenses.routes";

const app = express(); // Create an Express application

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/expenses", expenseRoutes); // Expense management routes

export default app;
