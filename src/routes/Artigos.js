import { Router } from "express"

import { 
    list,
    search,
    add,
    update,
    deleteOne
}  from "../controllers/ArtigoController.js"

import { authMiddleware } from '../middleware/AuthMiddleware.js'

const artigoRoutes = Router()

artigoRoutes.get('/list', authMiddleware, list)
artigoRoutes.get('/search/:id', authMiddleware, search)
artigoRoutes.post('/add', authMiddleware, add)
artigoRoutes.put('/update', authMiddleware, update)
artigoRoutes.delete('/delete/:id', authMiddleware, deleteOne)

export default artigoRoutes