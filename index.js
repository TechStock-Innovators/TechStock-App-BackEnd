import express from 'express'
import cors from 'cors'
import {connection} from "./database.js"

const app = express()
const PORT = 4000

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send("Starter")
})

app.post('/user/verify', async (req, res) => {
    const data = req.body
    
    try {
        const dbData = await connection.promisse().query(
            `SELECT * FROM users WHERE user = ${data["user"]}` 
        )
        res.status(202).json({
            message: "Usuário logado"
        })
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
})


app.listen(PORT, () => { 
    console.log(`Server listening in http://localhost:${PORT}`)
})