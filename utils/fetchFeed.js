const Parser = require('rss-parser');
const parser = new Parser();
const formatDate = require('../utils/formatDate');

const tryFetchFeedContent = async (url) => {
    // console.log("url:", feed.url);
    try {
        // const content = await parse(feed.url);
        // published: 1686520800000, 
        // created: 1686520800000,

        const content = await parser.parseURL(url);
        // pubDate: '2023-06-12T00:00:00.000Z' --> ticks (.NET framework 100 nanoseconds since January 1, 0001, at 00:00:00 UTC) 638221248000000000 --> unix timestamp in milliseconds 1686520800000 (since 01/01/1970)
        // isoDate: '2023-06-12T00:00:00.000Z'

        //content.items.sort((a, b) => a - b);
        
        const now = new Date();

        // content.items.forEach(i => i.formatedDate = formatDate(new Date(i.created), now))
        content.items.forEach(i => i.formatedDate = formatDate(new Date(i.isoDate), now))

        // Handle specific case (only StackOverflow at the moment) where title is not a string
        if (typeof content.title === "object") {
          content.title = content.title["$text"];
        }

        return { success: true, content };
      } catch (error) {
        return { success: false, error: { url, errorMessage: error}};
      }
}

module.exports = tryFetchFeedContent;