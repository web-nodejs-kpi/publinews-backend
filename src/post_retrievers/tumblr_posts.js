require('dotenv').config()
const tumblr = require('tumblr.js')

const client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
    returnPromises: true,
})

const get_tumblr_posts = async (blogName, postsCount = 3) => {
    const res = await client.blogPosts(blogName)
    return res.posts.slice(0, postsCount).map(el => {
        return { content: el.reblog.comment, date: el.date }
    })
}

module.exports = get_tumblr_posts()
