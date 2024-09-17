import { Router } from "express"

import { 
    ultimasMensagens
}  from "../controllers/DashboardController.js"

import { authMiddleware } from '../middleware/AuthMiddleware.js'

const dashboardRoutes = Router()

dashboardRoutes.get('/ultimasMensagens', authMiddleware, ultimasMensagens)

export default dashboardRoutes