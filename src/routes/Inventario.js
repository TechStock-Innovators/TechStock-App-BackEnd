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
inventarioRoutes.post('/add', authMiddleware, add)
inventarioRoutes.put('/update', authMiddleware, update)
inventarioRoutes.delete('/delete/:id', authMiddleware, deleteOne)

export default inventarioRoutes