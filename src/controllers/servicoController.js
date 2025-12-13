const { servicoModel } = require("../models/servicoModel")

const servicoController = {
    listar: async (req, res) => {
        try {
            const servicos = await servicoModel.buscarTodos()
            res.status(200).json(servicos)
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar serviços" })
        }
    },

    criar: async (req, res) => {
        try {
            const { NomeServico, Preco } = req.body

            if (!NomeServico || !Preco) {
                return res.status(400).json({ erro: 'Nome e Preço são obrigatórios' })
            }

            await servicoModel.inserirServico(NomeServico, Preco)

            res.status(201).json({ message: 'Serviço criado com sucesso' })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar serviço' })
        }
    }
}

module.exports = { servicoController }