const getTweets = require('recent-tweets')

getTweets('BBCWorld').then(x => console.log(x))
