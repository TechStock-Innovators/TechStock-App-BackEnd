import mysql from "mysql2/promise"

import DBCfg from "../config/db.js"

const connection = await mysql.createConnection(DBCfg)

export const list = async (req, res) => {
    try {
        const [rows, fields] = await connection.execute(
            `SELECT * FROM chamados WHERE status <> 'Solucionado'` 
        )
        
        
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
}

export const search = async (req, res) => {
    try {
        const [rows, fields] = await connection.execute(
            `SELECT * FROM chamados WHERE id = ${req.params.id}` 
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
}

export const add = async (req, res) => {
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
}

export const update = async (req, res) => {
    const data = req.body

    try{
        const [rows, fields] = await connection.execute(
            `UPDATE chamados 
            SET 
                responsavel = '${data["responsavel"]}',
                setor = '${data["setor"]}',
                tecnico = '${data["tecnico"]}',
                tags = '${data["tags"]}',
                status = '${data["status"]}',
                linksBase = NULL,
                edited_at = current_timestamp(),
                edited_by = 'SEM NOME AINDA'
            WHERE 
                chamados.id = ${data["id"]}`
        )

        res.status(202).json({
            success: true,
            message: "Usuário logado"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error,
        });
    }
}

export const msgUpdate = async (req, res) => {
    const data = req.body
    
    try{
        const [rows, fields] = await connection.execute(
            `SELECT mensagens FROM chamados WHERE id = ${data["id"]}` 
        )
        let temp = JSON.parse(rows[0]["mensagens"])
        temp.push(data.mensagem)
            // console.log JSON.parse(
        await connection.execute(
            `UPDATE chamados 
            SET 
                mensagens = '${JSON.stringify(temp)}'
            WHERE 
                chamados.id = ${data["id"]}`
        )

        const [rowsUP, fieldsUP] = await connection.execute(
            `SELECT mensagens FROM chamados WHERE id = ${data["id"]}` 
        )

        res.status(202).json({
            success: true,
            msgData: rowsUP,
            message: "Usuário logado"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error,
        });
    }
}

export const deleteOne = async (req, res) => {
    try{
        const [rows, fields] = await connection.execute(
            `DELETE FROM chamados WHERE chamados.id = ${req.params.id}`
        )
        
        res.status(202).json({
            success: true,
            message: "Chamado removido com sucesso"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error,
        });
    }
}