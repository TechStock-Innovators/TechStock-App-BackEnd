// import DBCfg from "../config/db.js"

// const connection = await mysql.createConnection(DBCfg)

import pool from "../api/DatabaseConnector.js"

export const quantidadeChamados = async (req, res) => {
    
}

// export const ultimasMensagens = async (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) {
//             res.status(500).json({
//                 success: false,
//                 message: err
//             })
//             return;
//         }

//         connection.query(`SELECT id, mensagens FROM chamados ORDER BY edited_at DESC LIMIT 10`, (err, result) => {
//             connection.release();
//             if (err) {
//                 res.status(500).json({
//                     success: false,
//                     message: err
//                 })
//                 return;
//             }
//             const temp = result.map(element => {
//                 const mensagens = JSON.parse(element.mensagens)
//                 return {
//                     id: element.id, 
//                     mensagem: mensagens
//                 }
//             });
//             const lista = temp.filter((item)=>{ return item.mensagem != undefined })
//             res.status(202).json({
//                 success: true,
//                 content: lista
//             })
//             return;
//         })
//     })
// }