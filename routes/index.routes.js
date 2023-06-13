const express = require('express');
const router = express.Router();
const { parse } = require('rss-to-json');
const Parser = require('rss-parser');
const parser = new Parser();
const isLoggedIn = require('../middleware/isLoggedIn');
const formatDate = require('../utils/formatDate');
const Feed = require('../models/Feed.model');
const User = require('../models/User.model');

/* GET home page */
router.get("/", async (req, res, next) => {
  // console.log("req.session.currentUser", req.session.currentUser);
  if(!req.session.currentUser) {
    res.render("index", { });
    return;
  }
  
  /********/
  /* READ */
  /********/

  try {
      const currentUser = await User.findById(req.session.currentUser._id)
        .populate('feeds');

      if(currentUser.feeds.length === 0) {
        res.render("/auth/user-profile");
        return;
      }
      
      const feedContent = [];
      const feeds = currentUser.feeds;
      //console.log("feeddd:", feeds);
      const feedsInError = [];
      for (let i = 0; i < feeds.length; i++) {
        const feed = feeds[i];
        try {

          // const content = await parse(feed.url);
          // published: 1686520800000, 
          // created: 1686520800000,

          const content = await parser.parseURL(feed.url);
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

          feedContent.push(content);
        } catch (error) {
          feedsInError.push({ url: feed.url, errorMessage: error});
        }
        // console.log("url:", feed.url);
      }

      // console.log("feeds", feedContent);
      res.render("index", { feeds : feedContent, feedsInError });

  } catch (error) {
    console.log('error', error);
    res.send('error parsing feed:' + error);
  }

});

module.exports = router;