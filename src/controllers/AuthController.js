import mysql from "mysql2/promise"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import DBCfg from "../config/db.js"

const connection = await mysql.createConnection(DBCfg)

export const register = async (req, res) => {
    const data = req.body
    
    try {
        const password = await bcrypt.hash(data.password, 10)

        const [rows, fields] = await connection.execute(
            `INSERT INTO (
                user,
                password,
                name,
                email,
                permission,
                section,
            ) VALUES (
                ${data.user},
                ${password},
                ${data.name},
                ${data.email},
                ${data.permission},
                ${data.section}
            )
            ` 
        )

        if (passwordBD == passwordLogin) {
            res.status(202).json({
                success: true,
                message: "Usuário registrado"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error,
        });
    }
}

export const novaSenha = async (req, res) => {
    const data = req.body


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

        const token = jwt.sign({name: rows[0]["name"]}, 'bananadoce', { expiresIn: '1h' })
        return res.status(200).json({
            success: true,
            message: "Usuário logado",
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
