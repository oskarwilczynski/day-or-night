# Day Or Night

## Authors's notes
Firstly I wanted to use React for this project, but there are two main reasons I have not. First, Google Maps API has no official support for React, all the implementations are done by community, which are not updated regurarly and lacks some of the basic functionalities - even getting coordinates on click seemed to be a problem.

The second one is that this app is, in my opinion, too simple to create it in React and all related technologies (like Webpack) - the app would have the only one component (the map).

## Important information about the problem I found in API
The problem with API is that it hard to check if it's night or day around later hours (around midnight for example) - because then the API gets an update with the new dates and sometimes user's current date is totally out of scope, because the sunrise/sunset dates are already for the next day - I would imagine it updates sunrise/sunsate date when the current date has passed one or another, but unfortunately it's not this way.

If I would have more time with the app, I could observe when exactly it happens and somehow try to adapt the app for it.

I've put a code that prevents one of the bugs, but because we've got minus hours on the west and plus hours on the east it's not possible to do it in one function.

### Tech Stack

  - HTML
  - CSS
  - JavaScript
  - Fetch API

### Usage

Simply run index.html from main folder.
