# project2-fullstack-webapp-feedsreader  
RSS Feeds Reader
A "live" feeds reader with a persistent reading list

![computer kid gif](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHBrNGZwNmNhOTRlbmxpZnI5ejN4YTQ2azZkamxoMmlpemVuZ3ozcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XreQmk7ETCak0/giphy.gif)

## Usage

1. Create a user account
2. Add one or multiple feeds in "User profile" page
    * By providing the url of a web site that provide a rss feed (and let the application extract the good data from it🤞)
    * Or, if it's not working, by manually providing the feed url (and some other informations)
3. Go back to your home page to see the content of all your feeds
4. Add some items in your reading list 😉
5. Refresh some time to time.

## Deployment on Adaptable.io

https://ironhack-project2-feedsreader.adaptable.app/

## Development

Steps to do:

1. Clone this repo
2. Restore dependendcies: `npm i`
3. Create an `.env` file at the root folder containing values for environment variables
    * `SESSION_SECRET`, with a custom secret value (use to store the values as session cookies)
    * `MONGODB_URI`, with the mongo db connection string
4. Run application with `npm run dev`


## Presentation

https://docs.google.com/presentation/d/16wGpk3eJEiVb17skrtFNC7zw9ivryPkRafhtqg2ARak/

## Structure

tree (top levels only)

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">