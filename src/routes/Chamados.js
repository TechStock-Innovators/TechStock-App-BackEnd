import { Router } from "express"
import { 
    list,
    search,
    add,
    update,
    msgUpdate,
    deleteOne
}  from "../controllers/ChamadosController.js"

const chamadosRoutes = Router()

chamadosRoutes.get('/list', list)

chamadosRoutes.get('/search/:id', search)

chamadosRoutes.post('/add', add)

chamadosRoutes.put('/update', update)

chamadosRoutes.put('/msgUpdate', msgUpdate)

chamadosRoutes.delete('/delete/:id', deleteOne)

export default chamadosRoutes