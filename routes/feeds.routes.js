const express = require("express");
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const FeedModel = require("../models/Feed.model")

/**********/
/* CREATE */
/**********/

router.get("/create", isLoggedIn, (req, res) => {
    res.render("feeds/feed-create")
})

router.post("/create", isLoggedIn, (req, res) => {
    FeedModel.create(req.body)
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

/**********/
/* DELETE */
/**********/

router.post("/delete/:id", isLoggedIn, (req, res) => {
    FeedModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/auth/user-profile")
        })
        .catch(e => {console.log(e)})
})

module.exports = router;