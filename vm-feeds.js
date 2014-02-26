/*
VM-Feeds.js is a way to aggregate dynamic, interactive content using the viewMachine engine to recieve content cross domain.

This also drives the content feeds for ViewMachine CMS
*/


(function (VM) {
  //Example

  function block () {
    // Function to construct contain for feed content
    return new new VM.El('div').css({'margin': '20px', 'background-color': 'white', 'border-radius': '10px'});
  }

  function sendRequest (url, callback) {
    //Function to send feed requests
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        // Success!
        callback(JSON.parse(request.responseText));
      } else {
        console.Log(request.status + ' ' + request.responseText);
      }
    };
    request.onerror = function() {
      console.log('Failed to connect');
    };
    request.send();
  }

  var total;
  var settings =
  {
    feeds: ['http://viewMachine.io/feed'],                                                                // URLs of ViewMachine feeds to aggregate content from
    interval: 30000,                                                                                     // Interval to refresh the feeds at
    parent: new VM.El('div').css({'width': '80%', 'margin': 'auto', 'background-color': '#ccc'}).draw(), // VM parent, to put in the content
    constructor: block                                                                                   // VM Wrapper for each piece of content
  };

  setInterval(function () {
    for (var feed in settings.feeds) {
      sendRequest(settings.feeds[feed], function(data) {
        console.log('data');
      });
    }
  }, settings.interval);

})(VM);