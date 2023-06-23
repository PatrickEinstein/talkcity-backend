import express from "express";
import { login, register } from "../controllers/auth.js";
import { upload } from "../index.js";

const router = express.Router();

router.post("/login", login);
router.post("/", upload.single("picture"), register);

export default router;
