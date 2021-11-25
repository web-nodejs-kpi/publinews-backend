// working last 10 tweets
// curl -X GET -H "Authorization: Bearer <BEARERTOKEN>" "https://api.twitter.com/2/users/152987149/tweets"

require('dotenv').config()
const { TwitterApi } = require('twitter-api-v2')

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN)

const roClient = twitterClient.readOnly
const userId = '152987149'
roClient.v2.userTimeline(userId).then(res => {
    const all_tweets = res.data.data
    all_tweets.forEach(el => console.log(el.text + '\n\n'))
})
