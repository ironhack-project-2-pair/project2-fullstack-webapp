# project2-fullstack-webapp

RSS Feed

## MVP

### Must

* [x] User account
* [x] CRUD on user's feeds
* [x] Display of content of feeds by feeds
* [x] Support Atom (atom: youtube, lemonde) https://www.npmjs.com/package/rss-to-json

### Nice


* [x] Rss http://rss.slashdot.org/Slashdot/slashdot
* [x] Reading list
* [x] Extract feeds from a web page
    * [x] Feed favicon
* [ ] Display of posts of feeds Ordered by date (Display: title & date)
    * [ ] bonus: event listener to post setting on checkbox click
* [ ] read/unread items in feeds (different whether feeds merged or separated)
    * [ ] bulk based on a specific date
    * [ ] item by item
* [ ] Preview of posts
* [ ] Being able to order feeds
* [ ] See all feeds in DB
    * [ ] and be able to subscribe to it
    * [ ] filtered by users
* [ ] Save posts in a DB
* [ ] Query online RSS feed DB (if it exists!) https://www.rsssearchhub.com/
* [ ] tags and like feed and search on it
* [ ] upload favicon


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