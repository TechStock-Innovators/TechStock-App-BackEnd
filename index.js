import express from 'express'
import cors from 'cors'

import authRoutes from "./src/routes/Auth.js"
import chamadosRoutes from "./src/routes/Chamados.js"
import inventarioRoutes from "./src/routes/Inventario.js"
import dashboardRoutes from "./src/routes/Dashboard.js"

import { authMiddleware } from './src/middleware/AuthMiddleware.js'

const app = express()
const PORT = 4000

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(express.json())
app.use(cors(corsOptions))

app.use("/user", authRoutes)
app.use("/chamados", authMiddleware, chamadosRoutes)
app.use("/inventario", inventarioRoutes)
app.use("/dashboard", dashboardRoutes)

app.get('/', (req, res) => {
    res.send("Starter")
})

app.listen(PORT, () => { 
    console.log(`Server listening in http://20.206.248.175:${PORT}`)
})