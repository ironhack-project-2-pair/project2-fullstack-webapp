const mongoose = require('mongoose');
const Feed = require('../models/Feed.model');
const User = require('../models/User.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project2-fullstack-webapp-feedsreader';

// RSS 0.91 or RSS 2.0 or ATOM or RSS 1.0 aka RDF
const feeds = [
  {
    "url": "https://stackoverflow.com/feeds/tag?tagnames=javascript&sort=newest",
    "title": "Javascript - Stack Overflow",
    "faviconUrl": "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
  },
  {
    "url": "http://xkcd.com/rss.xml",
    "title": "xkcd.com",
    "faviconUrl": "http://xkcd.com/s/919f27.ico"
  },
  {
    "url": "https://www.lemonde.fr/rss/une.xml",
    "title": "Le Monde.fr - Actualités et Infos en France et dans le monde",
    "faviconUrl": "http://lemonde.fr/dist/assets/img/logos/favicon.ico"
  },
  {
    "url": "https://dwh.lequipe.fr/api/edito/rss?path=/",
    "title": "L'équipe",
    "faviconUrl": "https://www.lequipe.fr/img/favicons/manifest-48x48.png"
  },
  { url: 'https://www.zdnet.fr/feeds/rss/actualites/',
    title: "L'équipe",
    // faviconUrl: ""
  },
  {
    "url": "https://rss.slashdot.org/Slashdot/slashdotMain",
    "title": "Slashdot",
    "faviconUrl": "https://slashdot.org/favicon.ico"
  },
  {
    "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCaNlbnghtwlsGF-KzAFThqA",
    "title": "Science Etonnante",
    "faviconUrl": "https://www.youtube.com/s/desktop/374faad5/img/favicon.ico"
  },
  {
    "url": "https://javascriptweekly.com/rss/",
    "title": "JavaScript Weekly",
    "faviconUrl": "https://javascriptweekly.com/favicon.png"
  },
];

let firstUser;
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    return Feed.deleteMany({}); //WARNING: this will delete all books in your DB !!
  })
  .then((response) => {
    // console.log(response);
    return User.findOne()
  })
  .then(user => {
    firstUser = user;
    // console.log("Found user", firstUser);
    return Feed.insertMany(feeds);
  })
  .then(feedsFromDB => {
    console.log(`Created ${feedsFromDB.length} feeds`);
    return User.findByIdAndUpdate(firstUser._id, {feeds: feedsFromDB.map(f => f._id)});
  })
  .then(() => {
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to DB: ", err);
  });
