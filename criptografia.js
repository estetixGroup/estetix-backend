const bcrypt = require("bcrypt")

const criptografia = {
    criptografarSenha: (senha) => {
        const saltRounds = 10
        return bcrypt.hashSync(senha, saltRounds)
    },

    compararSenha: (senhaDigitada, senhaBanco) => {
        return bcrypt.compareSync(senhaDigitada, senhaBanco)
    }
}

module.exports = { criptografia }