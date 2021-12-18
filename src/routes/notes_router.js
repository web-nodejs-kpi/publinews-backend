const express = require('express')
const router = express.Router()

const {
    get_all_notes,
    get_note_by_id,
    insert_note,
    delete_note,
} = require('../db/quering/notes_quering')

router.get('/', async (req, res) => {
    const all_notes = await get_all_notes()
    res.status(200).send(all_notes)
})

router.get('/:note_id', async (req, res) => {
    const note_id = req.params.note_id
    const note = await get_note_by_id(note_id)
    if (note) {
        res.status(200).send(note)
    } else {
        res.status(404).send({ details: `No note with id ${note_id}` })
    }
})

router.post('/', async (req, res) => {
    const { link, headline, content } = req.body

    if (!link || !headline || !content) {
        res.status(400).send({
            details: 'not enough info provided, need: link, headline, content',
        })
    } else {
        const insert = await insert_note(link, headline, content)
        if (insert instanceof Error) {
            res.status(400).send({ details: insert.message })
        } else {
            res.status(201).send({ success: `inserted with id ${insert}` })
        }
    }
})

router.delete('/:note_id', async (req, res) => {
    const note_id = req.params.note_id
    const deleted = await delete_note(note_id)
    if (deleted instanceof Error) {
        res.status(400).send({ details: deleted.message })
    } else {
        res.status(204).send({ details: `deleted note with id ${note_id}` })
    }
})

module.exports = router
