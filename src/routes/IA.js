import { Router } from "express";

import {
    getClassificacao
} from "../controllers/IAController.js"


const IARoutes = Router()

IARoutes.post('/getClassificacao', getClassificacao)

export default IARoutes