const express = require("express")
const app = express()
const clienteRoutes = require("./src/routes/clienteRoutes")
require("dotenv").config()

app.use(express.json())

app.use("/clientes", clienteRoutes)

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})