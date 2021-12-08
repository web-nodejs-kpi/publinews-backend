require('dotenv').config()
const tumblr = require('tumblr.js')

const client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
})

client.blogPosts('taylorswift', (err, resp) => {
    console.log(
        resp.posts.slice(0, 2).map(el => {
            return { content: el.reblog.comment, date: el.date }
        })
    )
})
