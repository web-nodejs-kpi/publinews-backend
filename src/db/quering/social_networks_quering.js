const { pg_config, db_name } = require('../constants')

const knex = require('knex').knex({
    client: 'pg',
    connection: {
        ...pg_config,
        database: db_name,
    },
})

const TABLE_NAME = 'social_network'

const get_all_social_networks = async () => {
    try {
        const social_networks = await knex(TABLE_NAME).select('*')
        return social_networks
    } catch (e) {
        return e
    }
}

module.exports = get_all_social_networks

// get_all_social_networks()
//     .then(res => console.log(res))
//     .then(() => knex.destroy())
