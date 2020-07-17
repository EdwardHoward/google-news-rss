const xml = require('xml-js');
const https = require('https');

async function getNews(query) {
    return new Promise((resolve) => {
        https.get(`https://news.google.com/rss/search?hl=en-US&gl=US&ceid=US:en&q=${query}`, function (result) {
            let dat = '';
            result.on('data', function (data) {
                dat += data;
            });

            result.on('end', () => {
                resolve(xml.xml2js(dat, { compact: true }));
            });
        });
    });
}

async function getRedditThreads(url) {
    return new Promise((resolve) => {
        https.get(`https://api.reddit.com/search.json?q=(url:'${url}')`, {
            headers: {
                "User-Agent": "Google News RSS feed"
            }
        }, function (result) {
            let dat = '';
            result.on('data', function (data) {
                dat += data;
            });

            result.on('end', () => {
                resolve(JSON.parse(dat));
            });
        });
    })
}

module.exports = { getNews, getRedditThreads };