import { Router } from "express"

import {
    verify,
    register,
    novaSenha,
    update,
    list,
    search,
    deleteOne,
    getTecnicos
} from "../controllers/AuthController.js"

const authRoutes = Router()

authRoutes.post("/verify", verify)

authRoutes.get("/list", list)
authRoutes.get("/search/:id", search)
authRoutes.post("/register", register)
authRoutes.put("/novaSenha", novaSenha)
authRoutes.put("/update/:id", update)
authRoutes.delete("/delete/:id", deleteOne)
authRoutes.get("/tecnicos", getTecnicos)

export default authRoutes