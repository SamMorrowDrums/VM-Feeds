/*
VM-Feeds.js is a way to aggregate dynamic, interactive content using the viewMachine engine to recieve content cross domain.

This also drives the content feeds for ViewMachine CMS
*/

var feeds = {};
var date;

exports.lastUpdated = function () {
  return date;
};

exports.createFeed = function (name, info) {
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
};
exports.deleteFeed = function (name) {
    if (feeds[name] !== undefined) {
      delete feeds[name];
      return true;
    } else {
      return false;
    }
};
exports.addItem = function (name, item) {
  date = new Date().getTime();
    if (feeds[name] !== undefined) {
      var newItem = {date: date, content: item};
      if (feeds[name].data.length >= feeds[name].info.maxLength) {
        var i = feeds[name].data.length - feeds[name].info.maxLength;
        i -= 1;
        feeds[name].data.splice(i, feeds[name].data.length);
      }
      feeds[name].data.push(newItem);
      return true;
    } else {
      return false;
    }
};
exports.fetch = function (name, num){
    if (feeds[name] !== undefined) {
      var output = {
        js: feeds[name].info.js,
        meta: feeds[name].info.meta,
        date: date,
        content: []
      };
      var len = feeds[name].data.length;
      var start = 0;
      if (num) {
        start = len - num > 0? len - num : 0;
      }
      for (var i = len - 1; i >= start; i--) {
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
};