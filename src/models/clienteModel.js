const { sql, getConnection } = require("../config/db")

const clientesModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection()
            let querySQL = "SELECT * FROM Clientes"
            const result = await pool.query(querySQL)
            return result.recordset
        } catch (error) {
            throw error
        }
    },

    buscarporEmail: async (Email) => {
        try {
            const pool = await getConnection()
            let querySQL = "SELECT * FROM Clientes WHERE Email = @Email"
            const result = await pool.request()
                .input("Email", sql.VarChar(200), Email)
                .query(querySQL)
            return result.recordset
        } catch (error) {
            throw error
        }
    },

    inserirClientes: async (Nome, CPF, Email, Senha) => {
        try {
            const pool = await getConnection()
            let querySQL = "INSERT INTO Clientes (Nome, CPF, Email, Senha) VALUES (@Nome, @CPF, @Email, @Senha)"
            
            await pool.request()
                .input("Nome", sql.VarChar(100), Nome)
                .input("CPF", sql.VarChar(20), CPF)
                .input("Email", sql.VarChar(100), Email)
                .input("Senha", sql.VarChar(255), Senha)
                .query(querySQL)
        } catch (error) {
            throw error
        }
    }
}

module.exports = { clientesModel }