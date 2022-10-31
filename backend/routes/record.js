import express from "express";
const router = express.Router();
import { getRecords, addRecord } from "../controllers/records.js";

router.get("/", getRecords);
router.post("/", addRecord);

export default router;
