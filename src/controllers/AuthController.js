import mysql from "mysql2/promise"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import DBCfg from "../config/db.js"

const connection = await mysql.createConnection(DBCfg)

export const list = async (req, res) => {
    try {
        const [rows, fields] = await connection.execute(
            `SELECT id, user, name, email, permission, section FROM users` 
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
            `SELECT * FROM users WHERE id = ${req.params.id}` 
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

export const register = async (req, res) => {
    const data = req.body
    
    try {
        const password = await bcrypt.hash(data.password, 10)

        const [rows, fields] = await connection.execute(
            `INSERT INTO users (
                user,
                password,
                name,
                email,
                permission,
                section
            ) VALUES ( '${data.user}', '${password}', '${data.name}', '${data.email}', '${data.permission}', '${data.setor}' )` 
        )
        res.status(202).json({
            success: true,
            message: "Usuário registrado"
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

    try {
        const [rows, fields] = await connection.execute(
            `UPDATE users SET 
                user = '${data["user"]}',
                name = '${data["name"]}',
                email = '${data["email"]}',
                permission = '${data["permission"]}',
                section = '${data["setor"]}'
            WHERE id = ${req.params.id}`
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

export const novaSenha = async (req, res) => {
    const data = req.body

    try {
        const [rows, fields] = await connection.execute(
            `UPDATE users SET password = '${data["senha"]}'
            WHERE id = ${data["id"]}`
        )
        res.status(202).json({
            success: true,
            message: "Registro alterado"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
}

export const verify = async (req, res) => {
    const data = req.body
    try {
        const [rows, fields] = await connection.execute(
            `SELECT * FROM users WHERE user = '${data["user"]}' LIMIT 1` 
        )
        const passwordBD = rows[0]['password']
        const passwordLogin = data.password

        const isPasswordValid = await bcrypt.compare(passwordLogin, passwordBD)
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Credencial não encontrada",
            });
        }

        const token = jwt.sign({name: rows[0]["name"], permissao: rows[0]["permission"],}, 'bananadoce', { expiresIn: '1h' })
        return res.status(200).json({
            success: true,
            message: "Usuário logado",
            nome: rows[0]["name"],
            permissao: rows[0]["permission"],
            token
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
    const data = req.body
    try {
        const [rows, fields] = await connection.execute(
            `DELETE FROM users WHERE id = ${req.params.id}` 
        )

        return res.status(200).json({
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

export const getTecnicos = async (req, res) => {

    try {
        const [rows, fields] = await connection.execute(
            `SELECT name FROM users WHERE permission = 'Técnico'`
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