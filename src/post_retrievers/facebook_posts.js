const rp = require('request-promise-native')
const cheerio = require('cheerio')

const get_facebook_posts = async (username, posts_count = 5) => {
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

    return timeline.slice(0, posts_count).map(post => {
        return {
            link: request_options.url,
            content: post.text(),
            created_at: post
                .parents('.userContentWrapper')
                .find('abbr')
                .attr('data-tooltip-content'),
        }
    })
}

module.exports = get_facebook_posts

// Example of usage
// get_facebook_posts('tsn.ua').then(res => console.log(res))
