const { pg_config, db_name } = require('../constants')

const knex = require('knex').knex({
    client: 'pg',
    connection: {
        ...pg_config,
        database: db_name,
    },
})

// TODO: check knex to work it seems not to work

// action
const createTables = async () => {
    await knex.schema.withSchema('public').createTable('source', table => {
        table.increments('source_id')
        table.string('social_network')
        table.string('content', 512)
    })

    await knex.schema.withSchema('public').createTable('news', table => {
        table.increments('news_id')
        table.string('social_network')
        table.string('link', 512)
        table.string('author')
        table.string('headline')
        table.string('content', 2048)
        table.string('rubric')
    })
}

createTables().then(() => knex.destroy())
