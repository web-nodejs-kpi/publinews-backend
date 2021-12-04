const { pg_config, db_name } = require('../constants')

const knex = require('knex').knex({
    client: 'pg',
    connection: {
        ...pg_config,
        database: db_name,
    },
})

const TABLE_NAME = 'source'

const get_all_sources = async () => {
    const sources = await knex.from(TABLE_NAME).select('*')
    return sources
}

const insert_source = async (source_name, link, rubric, social_network_id) => {
    const source_id = await knex(TABLE_NAME)
        .insert({
            name: source_name,
            link: link,
            rubric: rubric,
            social_network_id: social_network_id,
        })
        .returning('source_id')
    return source_id[0]
}

const delete_source = async source_id => {
    const deleted = await knex(TABLE_NAME).where('source_id', source_id).del()
    return deleted
}

// checked

// get_all_sources()
//     .then(res => res.forEach(el => console.log(el)))
//     .then(() => knex.destroy())

// delete_source(1)
//     .then(res => console.log(res))
//     .then(() => knex.destroy())

// insert_source('lol', '2ji3f9j2f', 'sports', 2)
//     .then(res => console.log(res))
//     .then(() => knex.destroy())

// test zone