import mysql from "mysql2"

import DBCfg from "../config/db.js"

const connection = await mysql.createConnection(DBCfg)