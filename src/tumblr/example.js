const tumblr = require('tumblr.js')
const client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
})

client.blogPosts('taylorswift', function (err, resp) {
    console.log(resp.posts)
})
