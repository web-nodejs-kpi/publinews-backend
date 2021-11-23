require('dotenv').config()
const path = require('path')
const MTProto = require('@mtproto/core')

const api_id = process.env.TELEGRAM_API_ID
const api_hash = process.env.TELEGRAM_API_HASH

class API {
    constructor() {
        this.mtproto = new MTProto({
            api_id,
            api_hash,

            storageOptions: {
                path: path.resolve(__dirname, './cache/1.json'),
            },
        })
    }

    async call() {
        const res = await this.mtproto.call('help.getNearestDc')
        console.log(res)
    }
}

const api = new API()
api.call()
