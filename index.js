//Configuração Inicial
require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')

// Leitura de Json (middleware)
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// Connection data (user, password, connection string)
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const CONNECTION_STRING = `mongodb+srv://${ user }:${ password }@cluster0.hiixt7o.mongodb.net/apinodejs`

//Connect to MongoDB
mongoose
.connect(CONNECTION_STRING)

//Connection successful
.then(() => {
    console.log("App conectada ao MongoDB")
    app.listen(3000)
})

//Connection error
.catch((err) => console.log(err))