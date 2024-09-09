import { Router } from "express"

import { 
    list,
    search,
    getChamados,
    add,
    update,
    deleteOne
}  from "../controllers/InventarioController.js"

import { authMiddleware } from '../middleware/AuthMiddleware.js'

const inventarioRoutes = Router()

inventarioRoutes.get('/list', authMiddleware, list)
inventarioRoutes.get('/search/:id', authMiddleware, search)
inventarioRoutes.get('/chamados/:patrimonio', authMiddleware, getChamados)
inventarioRoutes.get('/add', authMiddleware, add)
inventarioRoutes.get('/update', authMiddleware, update)
inventarioRoutes.get('/delete/:id', authMiddleware, deleteOne)

export default inventarioRoutes