VM-Feeds
========

Dynamic, interactive content aggregator for ViewMachine


VM-Feeds is designed to facilitate the aggregation, and display of aggregated ViewMachine data.

Rather than passing data feeds around the internet, VM enables you to pass interactive content around, and enables the recipient to choose how much processing they do (if any at all), so you can even share content with events, styling and more.

No Eval, just JSON.




VM-Feeds-Server
===============

This is a node.js module, that enables you to easily create and serve multiple feeds. This is currently not hooked up to a database, however, the hooks can easily be added to enable you to set custom store, access and delete functions, that will be used instead of the RAM, to enable you to have multiple node processes reading from, and saving to the same data.


```javascript

var feeds = require('./VM-Feeds-Server');
var express = require('express');
var app = express();

//Create a feed with name and details (age in ms and length as integer)
feeds.createFeed('customFeed', {
  maxAge: 86400000,
  maxLength: 10,
  meta: {
    origin: 'ViewMachine.io',
    author: 'Sam Morrow',
    info: 'This feed is a test for ViewMachine Feeds project. Mentioned JS dependencies are optional, but ViewMacine is needed to interpret the feed'
  },
  js: ['http://viewmachine.io/matrix3d.js', 'http://viewmachine.io/feed.js']
});


//Next add in template items, as they are created, using ViewMachine Server (yet to be released)
feeds.addItem('customFeed', 'Some ViewMachine JSON');

//Finally, serve your feed
app.get('/feeds/:feed/:num?', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.json(feeds.fetch(req.params.feed, req.params.num));
});




```