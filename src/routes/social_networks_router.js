const express = require('express')
const router = express.Router()

const get_all_social_networks = require('../db/quering/social_networks_quering')

router.get('/', async (req, res) => {
    const all_social_networks = await get_all_social_networks()

    res.status(200).send(all_social_networks)
})

module.exports = router
