// import DBCfg from "../config/db.js"

// const connection = await mysql.createConnection(DBCfg)

import pool from "../api/DatabaseConnector.js"

export const list = async (req, res) => {
    pool.getConnection((err, connection)=> {
        if (err) {
            res.status(500).json({
                success: true,
                message: err,
            });
            return;
        }

        connection.query(`SELECT * FROM chamados WHERE status <> 'Solucionado'`, (err, result) => {
            connection.release();
            
            if (err) {
                res.status(500).json({
                    success: true,
                    message: err,
                });
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
                success: true,
                message: err,
            });
            return;
        }

        connection.query( `SELECT * FROM chamados WHERE id = ${req.params.id}`, (err, result) => {
            connection.release();

            if (err) {
                res.status(500).json({
                    success: true,
                    message: err,
                });
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

        connection.query(`INSERT INTO chamados
            (patrimonio, descricao, responsavel, setor, mensagens, created_at, created_by) 
            VALUES 
            (${data['patrimonio']}, '${data['descricao']}', '${data['responsavel']}', '${data['setor']}', '${data['messagesID']}',
            current_timestamp(), 'SEM NOME')`, (err, result) => {
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

        connection.query(`UPDATE chamados 
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
                chamados.id = ${data["id"]}`, 
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

export const msgUpdate = async (req, res) => {
    const data = req.body
    
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: err
            })
            return;
        }

        connection.query(`UPDATE chamados 
            SET 
                mensagens = '${JSON.stringify(temp)}'
            WHERE 
                chamados.id = ${data["id"]}` , (err, result) => { // `SELECT mensagens FROM chamados WHERE id = ${data["id"]}`
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

        connection.query( `DELETE FROM chamados WHERE chamados.id = ${req.params.id}`, (err, result) => {
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