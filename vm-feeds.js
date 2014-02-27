/*
VM-Feeds.js is a way to aggregate dynamic, interactive content using the viewMachine engine to recieve content cross domain.

This also drives the content feeds for ViewMachine CMS
*/


(function (VM) {
  //Example

  function block () {
    // Function to construct contain for feed content
    return new VM.El('div').css({'margin': '20px', 'padding': '15px', 'background-color': 'white', 'border-radius': '10px'});
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

  function getFeed () {
      for (var feed in settings.feeds) {
        sendRequest(settings.feeds[feed], function(data) {
          var cont;
          settings.parent.splice(0, settings.parent.length);
          for (var i = 0; i < data.content.length; i++) {
            cont = settings.constructor();
            cont.append(new VM.El('h3').text(new Date(data.content[i].date)));
            cont.append(VM.jsonTemplate(data.content[i].content));
            settings.parent.append(cont);
          }
        });
      }
    }

  var total;
  var settings =
  {
    feeds: ['http://localhost:3000/feeds/customFeed'],                                                                // URLs of ViewMachine feeds to aggregate content from
    interval: 30000,                                                                                     // Interval to refresh the feeds at
    parent: new VM.El('div').css({'width': '80%', 'padding': '20px', 'margin': 'auto', 'background-color': '#ccc'}),       // VM parent, to put in the content
    constructor: block                                                                                   // VM Wrapper for each piece of content
  };
  document.addEventListener('DOMContentLoaded', function(){
    settings.parent.draw();
    setInterval(getFeed, settings.interval);
    getFeed();
  });

})(VM);