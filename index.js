//Initial configuration
require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')

// Json (middleware)
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Routes
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// Connection data (user, password, connection string)
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const addressMongo = process.env.ADDRESS_MONGO
const CONNECTION_STRING = `mongodb+srv://${ user }:${ password }${ addressMongo }`

//Connect to MongoDB
mongoose
.connect(CONNECTION_STRING)

//Connection successful
.then(() => {
    console.log("App connected to MongoDB")
    app.listen(3000)
})

//Connection error
.catch((err) => console.log(err))