


import pool from "../api/DatabaseConnector.js";

export const getClassificacao = async (req, res) => {
    const data = req.body

    // const url = '20.206.248.175'
    const url = 'http://localhost:5000/'
    let incomingInfo = await fetch(url + 'indentificar', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        return data["resposta"]
    })

    return res.status(200).json({
        classificacao: incomingInfo
    })
}