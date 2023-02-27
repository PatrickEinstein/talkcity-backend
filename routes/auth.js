import express from "express";
import { login, register } from "../controllers/auth.js";



const router = express.Router();

export const LoginPage =router.post("/login", login);
export const RegisterPage = router.post("/" , register)

export default router;