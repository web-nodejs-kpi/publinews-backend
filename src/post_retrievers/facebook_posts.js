const rp = require('request-promise-native')
const cheerio = require('cheerio')

const get_facebook_posts = async (username, posts_count = 3) => {
    const request_options = {
        url: 'https://www.facebook.com/' + username + '/posts',
        headers: {
            'User-Agent':
                'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:64.0) Gecko/20100101 Firefox/64.0',
        },
    }
    const data = await rp.get(request_options)
    const $ = cheerio.load(data)
    const timeline = $('.userContent')
        .map((i, el) => $(el))
        .get()
    return timeline
        .map(post => {
            return {
                text: post.text(),
                created_at: post
                    .parents('.userContentWrapper')
                    .find('abbr')
                    .attr('data-tooltip-content'),
            }
        })
        .slice(Math.min(posts_count, 19))
}

module.exports = get_facebook_posts()
