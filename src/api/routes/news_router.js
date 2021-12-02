const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send(`request news with params ${req.params}`)
    res.sendStatus(200)
})

module.exports = router
