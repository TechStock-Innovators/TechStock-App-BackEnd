// import DBCfg from "../config/db.js"

// const connection = await mysql.createConnection(DBCfg)

import pool from "../api/DatabaseConnector.js"

export const quantidadeChamados = async (req, res) => {
    
}

export const index = async (req, res) => {
    pool.getConnection(async (err, connection) => {
        
        const getTicketsAnteriores = () => { 
            return new Promise((resolve, reject) => {
                connection.query(`SELECT status, COUNT(status) AS qnt
                                        FROM techstockapp.chamados
                                        WHERE WEEK(created_at) = WEEK(now()) - 1
                                        GROUP BY status`,
                            (err, result) => {
                                if(err) {
                                    reject(err);
                                }
                                let TicketsAnteriores = {}
                                result.forEach((element, key) => {
                                    if (element.status=="Em pausa") {
                                        element.status = "EmPausa"
                                    }
                                    if (element.status=="Em atendimento") {
                                        element.status = "EmAtendimento"
                                    }
                                    TicketsAnteriores[element.status] = element.qnt
                                });
                                resolve(TicketsAnteriores)
                            })
        })}

        const getTicketsAtuais = () => { 
            return new Promise((resolve, reject) => {
                connection.query(`SELECT status, COUNT(status) AS qnt
                                    FROM techstockapp.chamados
                                    WHERE WEEK(created_at) = WEEK(now())
                                    GROUP BY status`,
                            (err, result) => {
                                if(err) {
                                    reject(err)
                                }
                                resolve(result)
                            })
        })}

        const geticketsPorCategoria = () => {
            return new Promise((resolve, reject) => {
            connection.query(`SELECT tags, COUNT(tags) AS qnt FROM techstockapp.chamados
                                WHERE MONTH(created_at) = MONTH(now()) AND tags IS NOT NULL
                                GROUP BY tags;`,
                        (err, result) => {
                            if(err) {
                                reject(err)
                            }
                            resolve(result)
                        })
        })}

        const getTicketsMaisRecentes = () => {
            return new Promise((resolve, reject) => {
            connection.query(`SELECT  * FROM techstockapp.chamados WHERE status <> 'Solucionado' ORDER BY created_at DESC LIMIT 10;`,
                        (err, result) => {
                            if(err) {
                                reject(err)
                            }
                            resolve(result)
                        })
        })}


        if(err) {
            res.status(500).json({
                success: false,
                message: err
            })
            return;
        }
        
        const [ticketsAnteriores, ticketsAtuais, ticketsPorCategoria, ticketsMaisRecentes] = await Promise.all([
            getTicketsAnteriores(),
            getTicketsAtuais(),
            geticketsPorCategoria(),
            getTicketsMaisRecentes()
        ])

        connection.release();

        // console.log(
        //     ticketsAnteriores, 
        //     ticketsAtuais, 
        //     ticketsPorCategoria, 
        //     ticketsMaisRecentes
        // )

        res.status(202).json({
            success: true,
            content: {
                ticketsAnteriores, 
                ticketsAtuais, 
                ticketsPorCategoria, 
                ticketsMaisRecentes
            }
        })
        return;
    })
}