const express = require('express')
const app = express()
require('dotenv').config()

const notes_router = require('./routes/notes_router')

app.use('/notes', notes_router)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(process.env.API_PORT, () => {
    console.log(`Running on http://localhost:${process.env.API_PORT}`)
})
