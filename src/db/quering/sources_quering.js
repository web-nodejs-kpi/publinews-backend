const { pg_config, db_name } = require('../constants')

const knex = require('knex').knex({
    client: 'pg',
    connection: {
        ...pg_config,
        database: db_name,
    },
})

const TABLE_NAME = 'source'
const SN_TABLE_NAME = 'social_network'

// const get_all_sources = async () => {
//     const sources = await knex.from(TABLE_NAME).select('*')
//     return sources
// }

const get_all_sources = async () => {
    const sources = await knex
        .from(TABLE_NAME)
        .join(
            SN_TABLE_NAME,
            TABLE_NAME + '.social_network_id',
            SN_TABLE_NAME + '.social_network_id'
        )
        .select(
            TABLE_NAME + '.source_id',
            TABLE_NAME + '.link',
            TABLE_NAME + '.name',
            TABLE_NAME + '.rubric',
            `${SN_TABLE_NAME}.name as social_network_name`
        )
    return sources
}

const find_source_social_network = async source_id => {
    try {
        // select name from social_network where social_network_id in (select social_network_id from source where source_id=4);
        const social_network_id = await knex
            .from(TABLE_NAME)
            .select('social_network_id')
            .where({ source_id: source_id })

        const social_network = await knex
            .from(SN_TABLE_NAME)
            .select('name')
            .where({
                social_network_id: social_network_id[0].social_network_id,
            })

        return social_network[0].name
    } catch {
        return new Error('Cannot find social network')
    }
}

const insert_source = async (source_name, link, rubric, social_network_id) => {
    try {
        const source_id = await knex(TABLE_NAME)
            .insert({
                name: source_name,
                link: link,
                rubric: rubric,
                social_network_id: social_network_id,
            })
            .returning('source_id')
        return source_id[0]
    } catch {
        return new Error('cannot insert such info')
    }
}

const delete_source = async source_id => {
    try {
        const deleted = await knex(TABLE_NAME)
            .where('source_id', source_id)
            .del()
        return deleted
    } catch {
        return new Error(`cannot delete with id ${source_id}`)
    }
}

const get_sources_by_rubric = async rubric => {
    try {
        const sources = await knex(TABLE_NAME)
            .select('*')
            .where('rubric', rubric)
        return sources
    } catch {
        return new Error(`cannot find with rubric ${rubric}`)
    }
}

module.exports = {
    get_all_sources,
    find_source_social_network,
    insert_source,
    delete_source,
    get_sources_by_rubric,
}

// get_sources_by_rubric('politics')
//     .then(res => console.log(res))
//     .then()
//     .then(() => knex.destroy())
