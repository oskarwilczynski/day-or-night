# Day Or Night

## Authors's notes
Firstly I wanted to use React for this project, but there are two main reasons I have not. First, Google Maps API has no official support for React, all the implementations are done by community, which are not updated regularly and lacks some of the basic functionalities - even getting coordinates on click seemed to be a problem.

The second one is that this app is, in my opinion, too simple to create it in React and all related technologies (like Webpack) - the app would have the only one component (the map) and honestly not worth it just for the React's state management.

## About the app itself
I'm writing this note because the app might look quite big for such simple functionality (three API fetches for example). The main reason for this is the date it must to deal with. Because of big differences in timezones (North America's West Coast or Australia), the current date is sometimes in the scope of yesterday's or tomorrow's sunrise/sunset cycles. To be as accurate as it's possible the app needs to check if the current time is not placed between yesterday's or tomorrow's cycle, otherwise it could display totally wrong value.

Keeping that in mind I tried to build the code in the most encapsulated and readable way I could.

### Tech Stack

  - HTML
  - CSS
  - JavaScript (ES6)
  - Google Maps API
  - Sunrise/Sunset API (https://sunrise-sunset.org/api)
  - Fetch API

### Usage

Simply run index.html from main folder.
