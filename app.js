const express = require("express")
const app = express()
const clienteRoutes = require("./src/routes/clienteRoutes")
const servicoRoutes = require("./src/routes/servicoRoutes") // Importa aqui
require("dotenv").config()

app.use(express.json())

app.use("/clientes", clienteRoutes)
app.use("/servicos", servicoRoutes) 

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})