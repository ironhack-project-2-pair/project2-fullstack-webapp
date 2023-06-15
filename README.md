# project2-fullstack-webapp-feedsreader
# RSS Feeds Reader
Just a live reader, not a fully-fledged aggregator! (but partially via a reading list)

## MVP

### Must

* [x] User account
* [x] CRUD on user's feeds
* [x] Display of content of feeds by feeds
* [x] Support Atom (atom: youtube, lemonde) https://www.npmjs.com/package/rss-to-json

### Nice

* [ ] styles with https://tailwindcss.com/
* [x] fix RSS 1.0 aka RDF, example: http://rss.slashdot.org/Slashdot/slashdot
* [x] Reading list
    * [x] READ items (list articles)
    * [x] CREATE items (add article)
    * [ ] DELETE items (clear all articles)
    * [ ] Check to not introduce double
    * [ ] Remove on opening (?)
    * [x] Favicon / feed name
* [x] Feeds CREATE --> Extract feeds from a web page source HTML code
    * [x] Extract feed favicon
    * [x] Extract feed title
    * [x] Upload favicon
* [x] Feeds READ --> Display of items of feeds ordered by date via a User setting
    * [ ] extra: add event listener to post setting on checkbox click
* [x] Feeds READ --> Display of items grouped by feeds or not via a User setting
    * [ ] extra: add event listener to post setting on checkbox click
* [x] Feeds READ --> Filter out items based a read date (via click on date Feeds Reader)
    * [x] when grouped by feeds --> read date applies only the feed's items
    * [x] when not grouped --> read date applies to all feeds' items
    * [x] when grouped by feeds or not --> remove or hide items filtered out
    * [x] when grouped by feeds or not --> fix number of items in feed in title
    * [x] clear read dates to see (again) all the items of a feed
* [ ] Limit items by feeds when grouped (only most recents no matter the order)
* [ ] Explore all feeds in DB, not only the ones of the user
    * [ ] Subscribe to a feed (add it to current user)
    * [ ] Filter feeds by user, likes, tags, etc.
    * [ ] only creator of feed can delete/update it (add isOwner middleware)
* [ ] Preview of posts
* [ ] Save older items in a DB if not in feed's item anymore (hourly? daily? user setting?)
* [ ] Query online RSS feed DB (if it exists!) https://www.rsssearchhub.com/
* [ ] Open youtube links on [Invidious](https://docs.invidious.io/instances/)
* [ ] Keep or extract website url and keep it in mongo to make the feed title a link toward website
* [ ] Extract image/favicon from feed data ( image/url in https://medium.com/feed/@netbasal )
* [ ] Send email recap each day/week/user setting with number of new items per feed


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

(* Item)

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">