const pgtools = require('pgtools')
const { pg_config, db_name } = require('../constants')

// action

pgtools.createdb(pg_config, db_name, function (err, res) {
    if (err) {
        console.error(err)
        console.log('error')
        process.exit(-1)
    }
})
