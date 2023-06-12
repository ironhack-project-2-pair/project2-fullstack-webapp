const express = require("express");
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const FeedModel = require("../models/Feed.model")
const UserModel = require("../models/User.model")

const tryFetchFeedContent = require("../utils/fetchFeed")

const HTMLParser = require("node-html-parser")
const URL = require("node:url")

/**********/
/* CREATE */
/**********/

router.get("/create", isLoggedIn, (req, res) => {
    res.render("feeds/feed-create")
})

router.post("/create", isLoggedIn, (req, res) => {
    let user;
    UserModel.findById(req.session.currentUser._id)
        .then(userFromDB => {
            user = userFromDB;
            return FeedModel.create(req.body)
        })
        .then((feedFromDB) => {
            user.feeds.push(feedFromDB)
            return UserModel.findByIdAndUpdate(user._id, user)
        })
        .then(() => {
            res.redirect("/auth/user-profile")
        })
        .catch(e => {console.log(e)})
})

/********/
/* EDIT */
/********/

router.get("/edit/:id", isLoggedIn, (req, res) => {
    FeedModel.findById(req.params.id)
        .then(feed => {
            res.render("feeds/feed-edit", {feed: feed})
        })
        .catch(e => {console.log(e)})
})

router.post("/edit/:id", isLoggedIn, (req, res) => {
    FeedModel.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect("/auth/user-profile")
        })
        .catch(e => {console.log(e)})
})

router.get("/details", isLoggedIn, async (req, res) => {
    const result = {};
    console.log("url", req.query.url);
    const response = await fetch(req.query.url);
    const body = await response.text();
    // console.log("body", body);
    const parsedBody = HTMLParser.parse(body);
    console.log("parse", parsedBody);

    try {
        //Try to get favicon
        const favicon = parsedBody.querySelector('link[rel="shortcut icon"]');
        console.log("favicon", favicon._attrs.href);
        const faviconUrl = new URL.URL(favicon._attrs.href, req.query.url);
        console.log("favicon url", faviconUrl);
        result.faviconUrl = faviconUrl.href;
    } catch (error) {
        console.log("Fail to get favicon :(", error);
    }

    try {
        // try to get rss feed url
        const rssFeed = parsedBody.querySelector('link[type="application/rss+xml"]');
        console.log("rss", rssFeed);
        console.log("rss", rssFeed._attrs.href);
        const rssUrl = new URL.URL(rssFeed._attrs.href, req.query.url);
        console.log("rss url", rssUrl);
        result.rssUrl = rssUrl.href;
    } catch (error) {
        return result;
    }

    if (result.rssUrl) {
        const feedResult = await tryFetchFeedContent(result.rssUrl);
        if (feedResult.success) {
        result.title = feedResult.content.title;
        }
    }

    res.json(result);
})

/**********/
/* DELETE */
/**********/

router.post("/delete/:id", isLoggedIn, (req, res) => {
    FeedModel.findByIdAndDelete(req.params.id)
        .then(feed => {
            // return UserModel.findByIdAndUpdate(req.session.currentUser._id, {$pullAll: {feeds: [{_id: feed._id}]}}) // ok
            // return UserModel.findByIdAndUpdate(req.session.currentUser._id, {$pullAll: {feeds: [feed._id]}}) // ok
            return UserModel.findByIdAndUpdate(req.session.currentUser._id, {$pullAll: {feeds: [feed]}}) // ok
        })
        .then(() => {
            res.redirect("/auth/user-profile")
        })
        .catch(e => {console.log(e)})
})

module.exports = router;