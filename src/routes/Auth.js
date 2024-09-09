import { Router } from "express"
import mysql from "mysql2/promise"

import {
    verify,
    register
} from "../controllers/AuthController.js"

const authRoutes = Router()

authRoutes.post("/verify", verify)
authRoutes.post("/register", register)

export default authRoutes