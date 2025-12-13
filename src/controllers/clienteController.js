const { clientesModel } = require("../models/clienteModel")
const { agendamentoModel } = require("../models/agendamentoModel")
const bcrypt = require("bcrypt") // Importado diretamente aqui
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET || 'chave_padrao_se_nao_tiver_env'

const clientesControllers = {
    listarClientes: async (req, res) => {
        try {
            const Clientes = await clientesModel.buscarTodos()
            res.status(200).json(Clientes)
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar clientes" })
        }
    },

    criarCliente: async (req, res) => {
        try {
            const { Nome, cpfCliente, Email, senhaCliente } = req.body
            
            if (!Nome || !cpfCliente || isNaN(cpfCliente) || !Email || !senhaCliente) {
                return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' })
            }

            const saltRounds = 10
            const senhaCriptografada = bcrypt.hashSync(senhaCliente, saltRounds)

            await clientesModel.inserirClientes(Nome, cpfCliente, Email, senhaCriptografada)
            
            res.status(201).json({ message: 'Cliente cadastrado com sucesso' })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao cadastrar cliente' })
        }
    },

    login: async (req, res) => {
        try {
            const { Email, Senha } = req.body

            if (!Email || !Senha) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' })
            }

            const usuarios = await clientesModel.buscarporEmail(Email)
            const usuario = usuarios[0]

            if (!usuario) {
                return res.status(401).json({ error: 'Usuário não encontrado' })
            }

            const senhaValida = bcrypt.compareSync(Senha, usuario.Senha)

            if (!senhaValida) {
                return res.status(401).json({ error: 'Senha incorreta' })
            }

            const token = jwt.sign({ id: usuario.IDCliente }, SECRET_KEY, { expiresIn: '1h' })

            res.status(200).json({ message: 'Login realizado', token })

        } catch (error) {
            res.status(500).json({ error: 'Erro ao realizar login' })
        }
    },

    agendar: async (req, res) => {
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
    }
}

module.exports = { clientesControllers }