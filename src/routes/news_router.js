const express = require('express')
const router = express.Router()

const {
    get_recent_news,
    get_recent_news_by_rubric,
} = require('../post_retrievers')

router.get('/', async (req, res) => {
    const news = await get_recent_news()

    res.status(200).send(news)
})

router.get('/:rubric', async (req, res) => {
    const rubric = req.params.rubric
    const news = await get_recent_news_by_rubric(rubric)

    res.status(200).send(news)
})

module.exports = router
