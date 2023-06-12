const express = require('express');
const router = express.Router();
const { parse } = require('rss-to-json');
const isLoggedIn = require('../middleware/isLoggedIn');
const formatDate = require('../utils/formatDate');
const Feed = require('../models/Feed.model');
const User = require('../models/User.model');

/* GET home page */
router.get("/", async (req, res, next) => {
  console.log("req.session.currentUser", req.session.currentUser);
  if(!req.session.currentUser) {
    res.render("index", { });
    return;
  }
  
  try {
      const currentUser =  await User.findById(req.session.currentUser._id)
        .populate('feeds');

      if(currentUser.feeds.length === 0) {
        res.render("auth/user-profile");
        return;
      }
      
      // console.log("Current user feeds", currentUser);
      const feedContent = [];
      const feeds = currentUser.feeds;
      //console.log("feeddd:", feeds);
      for (let i = 0; i < feeds.length; i++) {
        const feed = feeds[i];
        // console.log("url:", feed.url);
        const content = await parse(feed.url);
        //console.log("content:", content);
        
        const now = new Date();
        content.items.forEach(i => i.formatedDate = formatDate(new Date(i.created), now))
        feedContent.push(content);
      }

      // console.log("feeds", feedContent);
      res.render("index", { feeds : feedContent });

  } catch (error) {
    console.log('error', error);
    res.send('error parsing feed:' + error);
  }
  // res.render("index");
});

module.exports = router;