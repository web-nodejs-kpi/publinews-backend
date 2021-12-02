const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('all notes')
    res.sendStatus(200)
})

router.get('/:note_id', (req, res) => {
    res.send(`note with id ${req.params.note_id}`)
    res.sendStatus(200)
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.sendStatus(201)
})

router.delete('/:note_id', (req, res) => {
    console.log(`deleted note with id ${req.params.note_id}`)
    res.sendStatus(204)
})
