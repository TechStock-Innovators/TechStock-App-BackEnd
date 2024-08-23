import mysql from "mysql2"

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "internet",
    password: "!@#ASD123asd",
    database: "TSBack"
})


export {
    connection
}