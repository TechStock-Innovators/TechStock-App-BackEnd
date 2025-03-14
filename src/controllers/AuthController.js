import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// import DBCfg from "../config/db.js"

// const connection = await mysql.createConnection(DBCfg)
import pool from "../api/DatabaseConnector.js"

export const list = async (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({
                success: true,
                message: err,
            });
            return;
        }
        
        connection.query(`SELECT id, user, name, email, permission, section FROM users`, (err, results) => {
            connection.release()
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err,
                });
                return;
            }

            res.status(202).json({
                success: true,
                content: results
            })
            return;
        })
    }) 
}

export const search = async (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({
                success: true,
                message: err,
            });
            return;
        }
        connection.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, results) => {
            connection.release()
            res.status(202).json({
                success: true,
                content: results
            })
            return;
        })
    })
}

export const register = async (req, res) => {
    const data = req.body
    
    pool.getConnection(async (err, connection) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err,
            });
            return;
        }
        const password = await bcrypt.hash(data.password, 10)
        connection.query(
            `INSERT INTO users (
                user,
                password,
                name,
                email,
                permission,
                section
            ) VALUES ( '${data.user}', '${password}', '${data.name}', '${data.email}', '${data.permission}', '${data.setor}' )`,
            (err, result) =>{
                connection.release()
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: err
                    })
                    return;
                }

                res.status(202).json({
                    success: true,
                    message: "Usuário não registrado",
                    content: result
                })
                return;
            }
        )
    })
        
}

export const update = async (req, res) => {
    const data = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err,
            });
            return;
        }
        connection.query(
            `UPDATE users SET 
                user = '${data["user"]}',
                name = '${data["name"]}',
                email = '${data["email"]}',
                permission = '${data["permission"]}',
                section = '${data["setor"]}'
            WHERE id = ${req.params.id}`,
            (err, result) => {
                connection.release()
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err,
                    });
                    return;
                }
                res.status(202).json({
                    success: true,
                    message: "Registro criado"
                })
                return;
            }
        )
    })
}

export const novaSenha = async (req, res) => {
    const data = req.body

    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err,
            });
            return;
        }
        connection.query(
            `UPDATE users SET password = '${data["senha"]}'
            WHERE id = ${data["id"]}`,
            (err, result) => {
                connection.release();
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err,
                    });
                    return;
                }

                res.status(202).json({
                    success: true,
                    message: "Registro alterado"
                })
                return;
            }
        )
    })
}

export const verify = async (req, res) => {
    const data = req.body
    
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                message: err,
            });
            return;
        }

        connection.query(`SELECT * FROM users WHERE user = '${data["user"]}' LIMIT 1`, async (err, results) => {
            connection.release();
            if (err) {
                console.log(err)
                res.status(500).json({
                    success: false,
                    message: err,
                });
                return;
            }
            console.log(results)

            if (results.length == 0) {
                return res.status(400).json({
                    success: false,
                    message: "Credencial não encontrada",
                });
            }
            
            const passwordBD = results[0]['password']
            const passwordLogin = data.password

            const isPasswordValid = await bcrypt.compare(passwordLogin, passwordBD)
            
            if (!isPasswordValid) {
                return res.status(400).json({
                    success: false,
                    message: "Credencial não encontrada",
                });
            }

            const token = jwt.sign({name: results[0]["name"], permissao: results[0]["permission"],}, 'bananadoce', { expiresIn: '1h' })
            return res.status(200).json({
                success: true,
                message: "Usuário logado",
                nome: results[0]["name"],
                permissao: results[0]["permission"],
                token
            })
        })
    })
}

export const deleteOne = async (req, res) => {
    const data = req.body
    
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err,
            });
            return;
        }
        connection.query(`DELETE FROM users WHERE id = ${req.params.id}`, (err, result) => {
            connection.release();
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err,
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Usuário logado"
            })
            return;
        })
    })
}

export const getTecnicos = async (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                success: true,
                message: err,
            });
            return;
        }

        connection.query(`SELECT name FROM users WHERE permission = 'Técnico'`, (err, result) => {
            connection.release();
            if(err) {
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