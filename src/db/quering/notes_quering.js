const { pg_config, db_name } = require('../constants')

const knex = require('knex').knex({
    client: 'pg',
    connection: {
        ...pg_config,
        database: db_name,
    },
})

const TABLE_NAME = 'note'

const get_all_notes = async () => {
    const notes = await knex
        .from(TABLE_NAME)
        .select('*')
        .orderBy('created_at', 'desc')
    return notes
}

const get_note_by_id = async note_id => {
    const note = await knex
        .from(TABLE_NAME)
        .select('*')
        .where('note_id', note_id)
    return note[0]
}

const insert_note = async (link, headline, content, source_id) => {
    const note_id = await knex(TABLE_NAME)
        .insert({
            link: link,
            headline: headline,
            content: content,
            created_at: new Date().toISOString(),
            source_id: source_id,
        })
        .returning('note_id')
    return note_id[0]
}

const delete_note = async note_id => {
    const deleted = await knex(TABLE_NAME).where('note_id', note_id).del()
    return deleted
}

module.exports = {
    get_all_notes,
    get_note_by_id,
    insert_note,
    delete_note,
}