const express = require('express')
const router = express.Router()

const get_recent_news = require('../post_retrievers')

router.get('/', async (req, res) => {
    const news = await get_recent_news()

    res.status(200).send(news)
})

module.exports = router
