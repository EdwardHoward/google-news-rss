const newsService = require('./news');
const cors = require('cors');
const express = require('express');

const server = express();

server.use(cors());

server.get('/', async (req, res) => {
    const news = await newsService.getNews(req.query.q || '*');
    const newsWithThreads = news.rss.channel.item.map(async (item, i) => {
        const threads = await newsService.getRedditThreads(item.link._text);
        if(threads) {
            item.threads = threads;
        }

        return item;
    });

    const ret = await Promise.all(newsWithThreads);
    res.json(ret);
});

module.exports = server;