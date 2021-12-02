const express = require('express')
const app = express()
require('dotenv').config()

const notes_router = require('./routes/notes_router')
const sources_router = require('./routes/sources_router')
const news_router = require('./routes/news_router')

app.use('/notes', notes_router)
app.use('/sources', sources_router)
app.use('/news', news_router)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(process.env.API_PORT, () => {
    console.log(`Running on http://localhost:${process.env.API_PORT}`)
})