import mysql from "mysql2/promise"

import DBCfg from "../config/db.js"

const connection = await mysql.createConnection(DBCfg)


export const quantidadeChamados = async (req, res) => {
    
}

export const ultimasMensagens = async (req, res) => {
    try {
        const [rows, fields] = await connection.execute(
            `SELECT id, mensagens FROM chamados ORDER BY edited_at DESC LIMIT 10`
        )
        const temp = rows.map(element => {
            const mensagens = JSON.parse(element.mensagens)
            return {
                id: element.id, 
                mensagem: mensagens[mensagens.length-1]
            }
        });
        const lista = temp.filter((item)=>{ return item.mensagem != undefined })

        return res.status(200).json({
            success: true,
            content: lista
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error,
        });
    }
}