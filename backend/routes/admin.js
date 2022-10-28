import express from "express";
const router = express.Router();
import { getStudents, addStudent } from "../controllers/students.js";

router.get("/", getStudents);
router.post("/", addStudent);

export default router;