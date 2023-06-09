# project2-fullstack-webapp

RSS Feed

## MVP

### Must

* User account
* CRUD on user's feeds
* Display of posts of feeds Ordered by date (Display: title & date)
* Support Rss Or Atom (atom: youtube, lemonde) https://www.npmjs.com/package/rss-to-json
* 

### Nice

* Rss && Atom
* Feed favicon
* Display of content of feeds by feeds
* Being able to order feeds
* Reading list
* Preview of posts
* Extract feeds from a web page
* See other users feeds and subscribe to it
* Save posts in a DB
* Query online RSS feed DB (if it exists!)
* tags and like feed and search on it

## Model

* User
    * email: String
    * password: String
    * Feeds: [Feed+] {User title: String & Feed}

* Feed
    * user_id : null 
    * titre : String
    * url: String
    * url favicon : Binary / String
    * tags [string]

(* Posts)