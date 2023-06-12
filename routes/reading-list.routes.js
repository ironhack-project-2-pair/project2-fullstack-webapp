const express = require("express");
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const ReadingList = require("../models/ReadingList.model")
router.get("/", isLoggedIn, async (req, res) => {
    const readingList = await ReadingList.findOne({userId: req.session.currentUser._id});
    res.render('readingList/all', { links: readingList.links });
})

router.post("/add", isLoggedIn, async (req, res) => {
    try {
        console.log("Add to reading list", req.body);
        const readingList = await ReadingList.findOne({userId: req.session.currentUser._id});
        if(readingList) {
            readingList.links.push({...req.body})
            const updated = await ReadingList.findByIdAndUpdate(readingList._id, readingList);
        }
        else {
            await ReadingList.create({
                userId: req.session.currentUser._id,
                links: [{...req.body}]
            })
        }
        console.log("added to reading list!");
        res.json({success: true});
    } catch (error) {
        console.log("adding to readin list error:", error);
        res.status(500).json({success: false});
    }
})


module.exports = router;