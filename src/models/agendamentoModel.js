const { sql, getConnection } = require("../config/db")

const agendamentoModel = {
    inserirAgendamento: async (idCliente, idServico, dataHoraInicio) => {
        try {
            const pool = await getConnection()
            
            let querySQL = "INSERT INTO Agendamentos (IDCliente, IDServico, DataHoraInicio, DataHoraFim) VALUES (@idCliente, @idServico, @dataHoraInicio, DATEADD(hour, 1, @dataHoraInicio))"

            await pool.request()
                .input("idCliente", sql.Int, idCliente)
                .input("idServico", sql.Int, idServico)
                .input("dataHoraInicio", sql.DateTime, dataHoraInicio)
                .query(querySQL)

        } catch (error) {
            throw error
        }
    }
}

module.exports = { agendamentoModel }