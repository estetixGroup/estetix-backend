const { agendamentoModel } = require("../models/agendamentoModel")

const agendamentoController = {
    criar: async (req, res) => {
        try {
            const { idCliente, idServico, dataHoraInicio } = req.body

            if (!idCliente || !idServico || !dataHoraInicio) {
                return res.status(400).json({ erro: 'Faltam dados para o agendamento' })
            }

            await agendamentoModel.inserirAgendamento(idCliente, idServico, dataHoraInicio)

            res.status(201).json({ message: 'Agendamento realizado com sucesso' })

        } catch (error) {
            res.status(500).json({ error: 'Erro ao realizar agendamento' })
        }
    },
}

module.exports = { agendamentoController }