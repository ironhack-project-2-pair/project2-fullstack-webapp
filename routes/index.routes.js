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
      
      const feedsContent = [];
      const feeds = currentUser.feeds;
      const feedsInError = [];
      for (let i = 0; i < feeds.length; i++) {
        const feed = feeds[i];
        const result = await tryFetchFeedContent(feed.url);
        if (result.success) {
          const feedContent = result.content;
          // add new properties to feed's data
          feedContent.title = feed.title ?? feedContent.title;
          feedContent.faviconUrl = feed.faviconUrl;
          feedContent.id = feed._id;
          feedContent.websiteUrl = feed.websiteUrl;
          // add new properties to feed's items
          feedContent.items.forEach(item => {
            item.feedId = feed._id
          })

          if(feed.url.indexOf("www.youtube.com") !== -1) {
            feedContent.items.forEach(a => {
              a.invidiousLink = a.link.replace('www.youtube.com', 'yewtu.be');
            });
          }

          // sort by date ascending (oldest first) / descending (newest first)
          feedContent.items.sort((a, b) => (new Date(a.isoDate) - new Date(b.isoDate)) * req.session.currentUser.settings.order)
          // filter items by feed read date
          if (currentUser.feedReadDates) {
            const readDate = currentUser.feedReadDates.get(feed._id);
            if(readDate) {
              const date = new Date(readDate);
              feedContent.items = feedContent.items.filter(i => i.postDate > date);
            }
          }
          feedsContent.push(feedContent);
        } else {
          feedsInError.push(result.error);
        }
      }

      if (!req.session.currentUser.settings.group) {
        // make a flat array containing all feeds items and add the source feed title to each item
        const feedsItemsAll = 
        feedsContent
          .reduce((feedsContentFlat, feedContent) => {
            feedsContentFlat
              .push(...feedContent.items.map(item => {
                item.feedTitle = feedContent.title
                item.feedId = feedContent.id
                item.faviconUrl = feedContent.faviconUrl
                return item
              }))
            return feedsContentFlat
          }, [])

        // sort by date ascending (oldest first) / descending (newest first)
        feedsItemsAll.sort((a, b) => (new Date(a.isoDate) - new Date(b.isoDate)) * req.session.currentUser.settings.order)

        // clear feedsContent
        // feedsContent.splice(0, feedsContent.length)
        feedsContent.length = 0
        feedsContent.push({title: "All feeds items", id: "all-feeds-items", items: feedsItemsAll});
      }

      res.render("index", { feeds : feedsContent, feedsInError });

  } catch (error) {
    console.log('error', error);
    res.send('error parsing feed:' + error);
  }
});

module.exports = router;