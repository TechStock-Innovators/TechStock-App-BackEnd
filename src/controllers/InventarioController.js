import mysql from "mysql2/promise"

import DBCfg from "../config/db.js"

const connection = await mysql.createConnection(DBCfg)

export const list = async (req, res) => {
    try {
        const [rows, fields] = await connection.execute(
            `SELECT * FROM inventario` 
        )
        
        res.status(202).json({
            success: true,
            content: rows
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error,
        });
    }
}

export const search = async (req, res) => {
    try {
        const [rows, fields] = await connection.execute(
            `SELECT * FROM inventario WHERE id = ${req.params.id}` 
        )
        
        res.status(202).json({
            success: true,
            content: rows
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error,
        });
    }
}

export const getChamados = async (req, res) => {
    try {
        const [rows, fields] = await connection.execute(
            `SELECT id, descricao, created_at FROM chamados WHERE patrimonio = ${req.params.patrimonio}` 
        )
        
        res.status(202).json({
            success: true,
            content: rows
        })
    } catch (error) {
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
            `INSERT INTO inventario
            (nome, patrimonio, modelo, processador, placamae, fonte, armazenamento, ram, placadevideo, sistemaoperacional, tipo, responsavel, observacoes, created_by) 
            VALUES 
            ('${data['nome']}', '${data['patrimonio']}', '${data['modelo']}', '${data['processador']}', '${data['placamae']}', '${data['fonte']}', '${data['armazenamento']}', 
            '${data['ram']}', '${data['pladadevideo']}', '${data['sistemaoperacional']}', '${data['tipo']}', '${data['responsavel']}', '${data['observacoes']}', 'SEM NOME')`
        )
        res.status(202).json({
            success: true,
            message: "Registro criado"
        })
    } catch (error) {
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
            `UPDATE inventario 
            SET 
                nome = '${data["nome"]}'
                ,patrimonio = ${data["patrimonio"]}
                ,modelo = '${data["modelo"]}'
                ,processador = '${data["processador"]}'
                ,placamae = '${data["placamae"]}'
                ,fonte = '${data["fonte"]}'
                ,armazenamento = '${data["armazenamento"]}'
                ,ram = '${data["ram"]}'
                ,placadevideo = '${data["placadevideo"]}'
                ,sistemaoperacional = '${data["sistemaoperacional"]}'
                ,tipo = '${data["tipo"]}'
                ,responsavel = '${data["responsavel"]}'
                ,observacoes = '${data["observacoes"]}'
            WHERE 
                id = ${data["id"]}`
        )

        res.status(202).json({
            success: true,
            message: "Usuário logado"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
}

export const deleteOne = async (req, res) => {
    try{
        const [rows, fields] = await connection.execute(
            `DELETE FROM inventario WHERE id = ${req.params.id}`
        )
        
        res.status(202).json({
            success: true,
            message: "Chamado removido com sucesso"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
}

