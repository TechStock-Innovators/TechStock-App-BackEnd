import mysql from "mysql2/promise"
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 4000

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "internet",
    password: "!@#ASD123asd",
    database: "techstockapp"
})

app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send("Starter")
})

app.get('/chamados/list', async (req, res) => {
    try {
        const [rows, fields] = await connection.execute(
            `SELECT * FROM chamados WHERE status <> 'Solucionado'` 
        )
        
        console.log(rows)
        
        res.status(202).json({
            success: true,
            content: rows
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            message: error,
        });
    }
})

app.post('/chamados/add', async (req, res) => {
    const data = req.body
    try {
        const [rows, fields] = await connection.execute(
            `INSERT INTO chamados
            (patrimonio, descricao, responsavel, setor, created_at, created_by) 
            VALUES 
            (${data['patrimonio']}, '${data['descricao']}', '${data['responsavel']}', '${data['setor']}', 
            current_timestamp(), 'SEM NOME')`
        )
        res.status(202).json({
            success: true,
            message: "Registro criado"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error,
        });
    }
})

app.post('/user/verify', async (req, res) => {
    const data = req.body
    
    try {
        const [rows, fields] = await connection.execute(
            `SELECT * FROM users WHERE user = '${data["user"]}' LIMIT 1` 
        )
        const passwordBD = rows[0]['password']
        const passwordLogin = data.password
        
        if (passwordBD == passwordLogin) {
            res.status(202).json({
                success: true,
                message: "Usuário logado"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error,
        });
    }
})


app.listen(PORT, () => { 
    console.log(`Server listening in http://localhost:${PORT}`)
})