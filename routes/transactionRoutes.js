import express from "express";
import {
  addTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", addTransaction);
router.get("/", getTransactions);
router.put("/:id", updateTransaction);

export default router;
