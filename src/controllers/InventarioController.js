// import DBCfg from "../config/db.js"

// const connection = await mysql.createConnection(DBCfg)

import pool from "../api/DatabaseConnector.js"

export const list = async (req, res) => {
    
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: err
            })
        }

        connection.query(`SELECT * FROM inventario`, (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    })
                    return;
                }

                res.status(202).json({
                    success: true,
                    content: result
                })
            })
    })
}

export const search = async (req, res) => {
    
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: err
            })
        }

        connection.query(`SELECT * FROM inventario WHERE id = ${req.params.id}`, (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    })
                    return;
                }

                res.status(202).json({
                    success: true,
                    content: result
                })
            })
    })
}

export const getChamados = async (req, res) => {
    
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: err
            })
        }

        connection.query(`SELECT id, descricao, created_at FROM chamados WHERE patrimonio = ${req.params.patrimonio}`, (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    })
                    return;
                }

                res.status(202).json({
                    success: true,
                    content: result
                })
            })
    })
}

export const add = async (req, res) => {
    const data = req.body
    
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: err
            })
        }

        connection.query(
            `INSERT INTO inventario
            (nome, patrimonio, modelo, processador, placamae, fonte, armazenamento, ram, placadevideo, sistemaoperacional, tipo, responsavel, observacoes, created_by) 
            VALUES 
            ('${data['nome']}', '${data['patrimonio']}', '${data['modelo']}', '${data['processador']}', '${data['placamae']}', '${data['fonte']}', '${data['armazenamento']}', 
            '${data['ram']}', '${data['pladadevideo']}', '${data['sistemaoperacional']}', '${data['tipo']}', '${data['responsavel']}', '${data['observacoes']}', 'SEM NOME')`, 
            (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    })
                    return;
                }

                res.status(202).json({
                    success: true,
                    content: result
                })
            })
    })
}

export const update = async (req, res) => {
    const data = req.body

    
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: err
            })
        }

        connection.query(
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
                id = ${data["id"]}`, 
            (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    })
                    return;
                }

                res.status(202).json({
                    success: true,
                    content: result
                })
            })
    })
}

export const deleteOne = async (req, res) => {
    
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: err
            })
        }

        connection.query(`DELETE FROM inventario WHERE id = ${req.params.id}`, (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    })
                    return;
                }

                res.status(202).json({
                    success: true,
                    content: result
                })
            })
    })
}

