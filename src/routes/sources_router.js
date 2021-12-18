const express = require('express')
const router = express.Router()

const {
    get_all_sources,
    insert_source,
    delete_source,
} = require('../db/quering/sources_quering')

router.get('/', async (req, res) => {
    const all_sources = await get_all_sources()
    res.status(200).send(all_sources)
})

router.post('/', async (req, res) => {
    const { source_name, link, rubric, social_network_id } = req.body

    if (!source_name || !link || !rubric || !social_network_id) {
        res.status(400).send({
            details:
                'not enough info provided, need: source_name, link, rubric, social_network_id',
        })
    } else {
        const insert = await insert_source(
            source_name,
            link,
            rubric,
            social_network_id
        )
        if (insert instanceof Error) {
            res.status(400).send({ details: insert.message })
        } else {
            res.status(201).send({ success: `inserted with id ${insert}` })
        }
    }
})

router.delete('/:source_id', async (req, res) => {
    const source_id = req.params.source_id
    const deleted = await delete_source(source_id)
    if (deleted instanceof Error) {
        res.status(400).send({ details: deleted.message })
    } else {
        res.status(204).send(`deleted source with id ${req.params.source_id}`)
    }
})

module.exports = router
