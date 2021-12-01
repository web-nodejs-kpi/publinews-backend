require('dotenv').config()
const pg_config = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
}

const db_name = process.env.POSTGRES_DB

module.exports = {
    pg_config,
    db_name,
}
