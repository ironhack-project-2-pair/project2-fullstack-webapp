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
    let parsedBody
    try {
        console.log("url", req.query.url);
        const response = await fetch(req.query.url);
        const body = await response.text();
        // console.log("body", body);
        parsedBody = HTMLParser.parse(body);
        // console.log("parse", parsedBody);
    } catch (error) {
        console.log("Fail to reach website or parse content :(", error);
        res.json(result);
        return;
    }

    const getUrlFromHtml = (querySelector) => {
        try {
            const linkHtmlElement = parsedBody.querySelector(querySelector);
            //console.log(`link href for ${querySelector}`, linkHtmlElement._attrs.href);
            const urlExtracted = new URL.URL(linkHtmlElement._attrs.href, req.query.url).href;
            console.log(`url extracted for ${querySelector}`, urlExtracted);
            return urlExtracted;
        } catch (error) {
            console.log(`"Fail to get ${querySelector} data :(`, error);
            return null;
        }
    }

    result.faviconUrl = getUrlFromHtml('link[rel="shortcut icon"]');
    if(!result.faviconUrl) {
        const faviconUrl = new URL.URL("/favicon.ico", req.query.url).href;
        
        try {
            await fetch(faviconUrl, { method: "HEAD" });
            result.faviconUrl = faviconUrl;
            console.log("Default favicon found!", faviconUrl);
        } catch (error) {
            console.log("Default favicon not available :(", faviconUrl);
        }
    }
  
    result.rssUrl = getUrlFromHtml('link[type="application/rss+xml"]')
        || getUrlFromHtml('link[type="application/atom+xml"]');
    
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