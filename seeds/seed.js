const mongoose = require('mongoose');
const Feed = require('../models/Feed.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project2-fullstack-webapp-feedsreader';


const feeds = [
    {
        url: "http://xkcd.com/atom.xml",
    },
    { url: 'https://stackoverflow.com/feeds/tag?tagnames=javascript&sort=newest' },
    { url: 'http://xkcd.com/atom.xml' },
    { url: 'https://www.lemonde.fr/rss/une.xml' },
    { url: 'https://dwh.lequipe.fr/api/edito/rss?path=/' },
    { url: 'https://www.zdnet.fr/feeds/rss/actualites/' },
    // { url: 'http://rss.slashdot.org/Slashdot/slashdot' },
    { url: 'https://www.youtube.com/feeds/videos.xml?user=ScienceEtonnante' },
    { url: 'https://cprss.s3.amazonaws.com/javascriptweekly.com.xml' },
];


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    return Feed.deleteMany({}); //WARNING: this will delete all books in your DB !!
  })
  .then( (response) => {
    console.log(response);

    return Feed.insertMany(feeds);
  })
  .then(feedsFromDB => {
    console.log(`Created ${feedsFromDB.length} feeds`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to DB: ", err);
  });
