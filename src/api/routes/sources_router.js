const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('all sources')
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.status(201).send(req.body)
})

router.delete('/:source_id', (req, res) => {
    res.status(204).send(`deleted note with id ${req.params.source_id}`)
})

module.exports = router
