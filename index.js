import mysql from "mysql2/promise"
import express from 'express'
import cors from 'cors'

import DBCfg from "./src/config/db.js"

import authRoutes from "./src/routes/Auth.js"
import chamadosRoutes from "./src/routes/Chamados.js"
import inventarioRoutes from "./src/routes/Inventario.js"

import { authMiddleware } from './src/middleware/AuthMiddleware.js'

const app = express()
const PORT = 4000

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

const connection = await mysql.createConnection(DBCfg)

app.use(express.json())
app.use(cors(corsOptions))

app.use("/user", authRoutes)
app.use("/chamados", authMiddleware, chamadosRoutes)
app.use("/inventario", inventarioRoutes)

app.get('/', (req, res) => {
    res.send("Starter")
})

// app.post('/user/verify', async (req, res) => {
//     const data = req.body
    
//     try {
//         const [rows, fields] = await connection.execute(
//             `SELECT * FROM users WHERE user = '${data["user"]}' LIMIT 1` 
//         )
//         const passwordBD = rows[0]['password']
//         const passwordLogin = data.password
        
//         if (passwordBD == passwordLogin) {
//             res.status(202).json({
//                 success: true,
//                 message: "Usuário logado"
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: error,
//         });
//     }
// })

app.listen(PORT, () => { 
    console.log(`Server listening in http://localhost:${PORT}`)
})