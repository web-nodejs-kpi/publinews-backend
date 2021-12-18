const get_facebook_posts = require('./facebook_posts')
const get_tumblr_posts = require('./tumblr_posts')
const get_twitter_posts = require('./twitter_posts')

const {
    get_all_sources,
    find_source_social_network,
} = require('../db/quering/sources_quering')

const FACEBOOK_SOURCE_NAME = 'fb'
const TUMBLR_SOURCE_NAME = 'tu'
const TWITTER_SOURCE_NAME = 'tw'

const get_posts_from_social_network = async source => {
    const link = source.link
    const source_id = source.source_id

    let social_network = ''
    try {
        social_network = await find_source_social_network(source_id)
    } catch {
        return []
    }

    let retrieved_posts
    switch (social_network) {
        case FACEBOOK_SOURCE_NAME:
            retrieved_posts = await get_facebook_posts(link)
            break
        case TUMBLR_SOURCE_NAME:
            retrieved_posts = await get_tumblr_posts(link)
            break
        case TWITTER_SOURCE_NAME:
            retrieved_posts = await get_twitter_posts(link)
            break
    }
    retrieved_posts.forEach(post => (post['source_name'] = source.name))
    return retrieved_posts
}

const get_recent_news = async () => {
    const sources = await get_all_sources()

    const all_news = []
    for (const source of sources) {
        const posts = await get_posts_from_social_network(source)
        all_news.push(...posts)
    }
    // return shuffled array
    return all_news.sort((a, b) => 0.5 - Math.random())
}

module.exports = get_recent_news

// Example of usage
// get_recent_news().then(res => console.log(res))
