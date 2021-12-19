require('dotenv').config()
const tumblr = require('tumblr.js')

const client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
    returnPromises: true,
})

const get_tumblr_posts = async (blogName, postsCount = 5) => {
    const res = await client.blogPosts(blogName)

    return res.posts.slice(0, postsCount).map(el => {
        return {
            link: el.post_url,
            content: el.caption.replace(/<[^>]+>/g, ''),
            created_at: el.date,
        }
    })
}

module.exports = get_tumblr_posts

// Example of usage
// get_tumblr_posts('taylorswift').then(res => console.log(res))
