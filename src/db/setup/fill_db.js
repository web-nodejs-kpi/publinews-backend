const { pg_config, db_name } = require('../constants')

const knex = require('knex').knex({
    client: 'pg',
    connection: {
        ...pg_config,
        database: db_name,
    },
})

// action
const create_social_network = () => {
    return knex.schema
        .withSchema('public')
        .createTable('social_network', table => {
            table.increments('social_network_id')
            table.string('name')
        })
}

const create_source = () => {
    return knex.schema.withSchema('public').createTable('source', table => {
        table.increments('source_id')
        table.string('name')
        table.string('link', 512)
        table.string('rubric')
    })
}

const create_notes = () => {
    return knex.schema.withSchema('public').createTable('note', table => {
        table.increments('note_id')
        table.string('link', 512)
        table.string('headline')
        table.string('content', 2048)
        table.timestamp('created_at')
    })
}

const add_foreign_key_source = () => {
    return knex.schema.table('source', table => {
        table.integer('social_network_id').unsigned()
        table
            .foreign('social_network_id')
            .references('social_network_id')
            .inTable('social_network')
    })
}

const create_tables = async () => {
    await create_social_network()
    await create_source()
    await create_notes()
    await add_foreign_key_source()
    await knex.destroy()
}

create_tables().then(() => console.log('Created tables'))
