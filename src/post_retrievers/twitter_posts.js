// working last 10 tweets
// curl -X GET -H "Authorization: Bearer <BEARERTOKEN>" "https://api.twitter.com/2/users/152987149/tweets"

require('dotenv').config()
const { TwitterApi } = require('twitter-api-v2')

const twitter_client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN)
const ro_client = twitter_client.readOnly

const get_twitter_posts = async (handle, posts_count = 3) => {
    const user = await ro_client.v2.userByUsername(handle)
    const res = await ro_client.v2.userTimeline(user.data.id, {
        max_results: Math.max(posts_count, 5),
        'tweet.fields': 'created_at',
    })
    return res.data.data.slice(0, posts_count).map(el => {
        return { content: el.text, date: el.created_at }
    })
}

module.exports = get_twitter_posts()
