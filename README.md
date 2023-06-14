# project2-fullstack-webapp-feedsreader
# RSS Feeds Reader

## MVP

### Must

* [x] User account
* [x] CRUD on user's feeds
* [x] Display of content of feeds by feeds
* [x] Support Atom (atom: youtube, lemonde) https://www.npmjs.com/package/rss-to-json

### Nice

* [ ] styles with Tailwind
* [x] fix RSS 1.0 aka RDF, example: http://rss.slashdot.org/Slashdot/slashdot
* [x] Reading list
    * [x] READ items (list articles)
    * [x] CREATE items (add article)
    * [ ] DELETE items (clear all articles)
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
    * [ ] when grouped by feeds or not --> fix number of items in feed in title
    * [ ] when grouped by feeds or not --> remove or hide items filtered out
* [ ] Limit items by feeds when grouped (only most recents no matter the order)
* [ ] Explore all feeds in DB, not only the ones of the user
    * [ ] Subscribe to a feed (add it to current user)
    * [ ] Filter feeds by user, likes, tags, etc.
    * [ ] only creator of feed can delete/update it (add isOwner middleware)
* [ ] Preview of posts
* [ ] Save older items in a DB if not in feed's item anymore
* [ ] Query online RSS feed DB (if it exists!) https://www.rsssearchhub.com/

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