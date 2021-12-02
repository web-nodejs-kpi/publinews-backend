const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(process.env.API_PORT, () => {
    console.log(`Running on http://localhost:${process.env.API_PORT}`)
})
