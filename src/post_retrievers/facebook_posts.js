const rp = require('request-promise-native')
const cheerio = require('cheerio')

function GetFbPosts(pageUrl) {
    const requestOptions = {
        url: pageUrl,
        headers: {
            'User-Agent':
                'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:64.0) Gecko/20100101 Firefox/64.0',
        },
    }
    return rp.get(requestOptions).then(postsHtml => {
        const $ = cheerio.load(postsHtml)
        const timeLinePostEls = $('.userContent')
            .map((i, el) => $(el))
            .get()
        const posts = timeLinePostEls.map(post => {
            return {
                message: post.html(),
                createdAt: post
                    .parents('.userContentWrapper')
                    .find('.timestampContent')
                    .html(),
            }
        })
        return posts
    })
}

GetFbPosts('https://www.facebook.com/tsn.ua/posts').then(posts => {
    for (const post of posts) {
        console.log(post.createdAt, post.message)
    }
})
