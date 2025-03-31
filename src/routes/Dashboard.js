import { Router } from "express"

import { 
    index
}  from "../controllers/DashboardController.js"

import { authMiddleware } from '../middleware/AuthMiddleware.js'

const dashboardRoutes = Router()

dashboardRoutes.get('/index', authMiddleware, index)

export default dashboardRoutes