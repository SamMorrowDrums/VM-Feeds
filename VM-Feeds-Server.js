/*
VM-Feeds.js is a way to aggregate dynamic, interactive content using the viewMachine engine to recieve content cross domain.

This also drives the content feeds for ViewMachine CMS
*/

var feeds = {};

Exports = {
  createFeed: function (name, info) {
    if (feeds[name] !== undefined) {
      console.log('Feed ' + name + ' already exists.');
      return false;
    } else {
      feeds[name] = {
        info: info,
        data: []
      };
      return true;
    }
  },
  deleteFeed: function (name) {
    if (feeds[name] !== undefined) {
      delete feeds[name];
      return true;
    } else {
      return false;
    }
  },
  addItem: function (name, item) {
    if (feeds[name] !== undefined) {
      var newItem = {date: new Date().getTime(), content: view};
      if (feeds[name].data.length >= feeds.info.maxLength) {
        var i = feeds[name].data.length - feeds.info.maxLength;
        feeds[name].data.splice(i, feeds[name].data.length, newItem);
      } else {
        feeds[name].data.push(newItem);
      }
      return true;
    } else {
      return false;
    }
  },
  fetch: function (name){
    if (feeds[name] !== undefined) {
      var output = {
        js: feeds[name].info.js,
        meta: feeds[name].info.meta,
        date: new Date().getTime(),
        content: []
      };
      for (var i = 0; i < feeds[name].data.length; i++) {
        if (feeds[name].info.maxAge && feeds[name].info.maxAge > output.date - feeds[name].data[i].date) {
          output.content.push(feeds[name].data[i]);
        } else if (feeds[name].info.maxAge) {
          feeds[name].data.splice(i, 1);
        } else {
          output.content.push(feeds[name].data[i]);
        }
      }
      return output;
    } else {
      return false;
    }
  }
};