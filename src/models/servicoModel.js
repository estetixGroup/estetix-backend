const { sql, getConnection } = require("../config/db")

const servicoModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection()
            let querySQL = "SELECT * FROM Servicos"
            const result = await pool.query(querySQL)
            return result.recordset
        } catch (error) {
            throw error
        }
    },

    inserirServico: async (NomeServico, Preco) => {
        try {
            const pool = await getConnection()
            let querySQL = "INSERT INTO Servicos (NomeServico, Preco) VALUES (@NomeServico, @Preco)"
            
            await pool.request()
                .input("NomeServico", sql.VarChar(100), NomeServico)
                .input("Preco", sql.Decimal(10, 2), Preco)
                .query(querySQL)
        } catch (error) {
            throw error
        }
    }
}

module.exports = { servicoModel }