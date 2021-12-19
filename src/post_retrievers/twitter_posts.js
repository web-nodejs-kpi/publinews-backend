// working last 10 tweets
// curl -X GET -H "Authorization: Bearer <BEARERTOKEN>" "https://api.twitter.com/2/users/152987149/tweets"

require('dotenv').config()
const { TwitterApi } = require('twitter-api-v2')

const twitter_client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN)
const ro_client = twitter_client.readOnly

const get_twitter_posts = async (username, posts_count = 5) => {
    const user = await ro_client.v2.userByUsername(username)
    const res = await ro_client.v2.userTimeline(user.data.id, {
        max_results: posts_count,
        'tweet.fields': 'created_at',
    })

    const tweets = res.data.data

    return tweets.map(tweet => {
        return {
            link: `https://twitter.com/${username}/status/${tweet.id}`,
            content: tweet.text,
            created_at: tweet.created_at,
        }
    })
}

module.exports = get_twitter_posts

// Example of usage:
// get_twitter_posts('CNN').then(res => console.log(res))
