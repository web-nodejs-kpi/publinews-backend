const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('all notes')
})

router.get('/:note_id', (req, res) => {
    res.status(200).send(`note with id ${req.params.note_id}`)
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.status(201).send(req.body)
})

router.delete('/:note_id', (req, res) => {
    res.status(204).send(`deleted note with id ${req.params.note_id}`)
})

module.exports = router
