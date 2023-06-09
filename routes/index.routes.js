const express = require('express');
const router = express.Router();
const { parse } = require('rss-to-json');

/* GET home page */
router.get("/", async (req, res, next) => {

  try {
    var rss = await parse('https://www.lemonde.fr/rss/une.xml');
    // res.send('content feed:' + JSON.stringify(rss, null, 3));
    // console.log(JSON.stringify(rss, null, 3));
    res.render("index", { feedContent : rss });

  } catch (error) {
    res.send('error parsing feed:' + error);
  }
  // res.render("index");
});

module.exports = router;
