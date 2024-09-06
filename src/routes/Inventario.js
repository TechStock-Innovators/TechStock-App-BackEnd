import { Router } from "express"

import { 
    list,
    search,
    getChamados,
    add,
    update,
    deleteOne
}  from "../controllers/InventarioController.js"

const inventarioRoutes = Router()

inventarioRoutes.get('/list', list)
inventarioRoutes.get('/search/:id', search)
inventarioRoutes.get('/chamados/:patrimonio', getChamados)
inventarioRoutes.get('/add', add)
inventarioRoutes.get('/update', update)
inventarioRoutes.get('/delete/:id', deleteOne)

export default inventarioRoutes