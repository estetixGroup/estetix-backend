const sql = require('mssql')

const CONFIG = {
    user: 'sa',
    password: '123456789',
    server: 'localhost',
    database: 'lojaDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function getConnection() {
    try {
        const pool = await sql.connect(CONFIG)
        return pool 
    } catch (error) {
        console.error('Erro na conexao SQL Server: ', error)
    }
}

module.exports = {
    sql,
    getConnection
}