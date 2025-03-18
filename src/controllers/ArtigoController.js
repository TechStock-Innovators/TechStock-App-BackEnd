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
            return;
        }

        connection.query(`SELECT * FROM artigos`, (err, result) => {
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
                return;
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
            return;
        }

        connection.query(`SELECT * FROM artigos WHERE id = ${req.params.id}`, (err, result) => {
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
                return;
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
            return;
        }

        connection.query(
            `INSERT INTO artigos
            (titulo,
            conteudo,
            autor,
            referencias)
            VALUES
            ('${data['titulo']}', '${data['conteudo']}', '${data['autor']}', '${data['referencias']}')`, 
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
                return;
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
            return;
        }

        connection.query(
            `UPDATE inventario 
            SET 
                titulo = ${data["titulo"]},
                conteudo = ${data["conteudo"]},
                autor = ${data["autor"]},
                referencias = ${data["referencias"]}
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
                return;
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
            return;
        }

        connection.query(`DELETE FROM artigos WHERE id = ${req.params.id}`, (err, result) => {
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
            return;
        })
    })
}

