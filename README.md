# project2-fullstack-webapp

RSS Feed

## MVP

### Must

* User account
* CRUD on user's feeds
* Display of posts of feeds Ordered by date (Display: title & date)
* Support Atom (atom: youtube, lemonde) https://www.npmjs.com/package/rss-to-json

### Nice

* Rss http://rss.slashdot.org/Slashdot/slashdot
* Reading list
* Display of content of feeds by feeds
* Being able to order feeds
* Preview of posts
* Extract feeds from a web page
    * Feed favicon
* See other users feeds and subscribe to it
* Save posts in a DB
* Query online RSS feed DB (if it exists!) https://www.rsssearchhub.com/
* tags and like feed and search on it
* read/unread items in feeds (different whether feeds merged or separated)

## Model

* User
    * email: String
    * password: String
    * Feeds: [Feed]

* Feed
    * titre : String
    * url: String
    * url favicon : Binary / String
    * tags [string]

(* Posts)

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">