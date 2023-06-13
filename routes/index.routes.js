const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const tryFetchFeedContent = require('../utils/fetchFeed');
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
        res.redirect("/auth/user-profile");
        return;
      }
      
      const feedContent = [];
      const feeds = currentUser.feeds;
      //console.log("feeddd:", feeds);
      const feedsInError = [];
      for (let i = 0; i < feeds.length; i++) {
        const feed = feeds[i];

        const result = await tryFetchFeedContent(feed.url);
        if (result.success) {
          feedContent.push(result.content);
        } else {
          feedsInError.push(result.error);
        }
      }

      // console.log("feeds", feedContent);
      res.render("index", { feeds : feedContent, feedsInError });

  } catch (error) {
    console.log('error', error);
    res.send('error parsing feed:' + error);
  }

});

module.exports = router;