window.fbAsyncInit = function() {
  FB.init({
    appId      : '466742083508337',
    xfbml      : true,
    version    : 'v2.4'
  });
  var $eventTemplate = $('.event--template');
  var $pastEvents = $('.events--past');
  var $currentEvents = $('.events--current');
  var userId = '914825215215018';
  //Any type of access token will do for publicly available feeds.
  //So, use the test app token.
  var accessToken = '466742083508337|ftQ0MZwU3FuIRE8utKmlkokotqI';

  //helper functions for date formatting, data cleaning, etc.
  var fixCover = function(event)  {
    //Add cover photo, if there is none
    var defaultCover = 'https://scontent-sjc2-1.xx.fbcdn.net/hphotos-xpf1/t31.0-8/11882267_1012124478818424_8688124413282336090_o.png';
    if(!event.cover)  {
      event.cover = {
        source: defaultCover
      };
    }
    return event;
  };
  var formatDate = function(event)  {
    //Month Day, 11AM-10PM
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //convert 24 hour time to 12 hour time
    var twelveHrTime = function(time) {
      var hour = (((time.getHours() - 1) % 12) + 1);
      var suffix = (time.getHours() < 12) ? 'AM' : 'PM';
      var minutes = (time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes().toString();
      return hour + ':' + minutes + suffix;
    }
    var eventDate = new Date(event.start_time);
    event.start_time = eventDate;
    event.start_text = months[eventDate.getMonth()] + ' ' + eventDate.getDate() + ', ' + twelveHrTime(eventDate);
    return event;
  }
  var formatEvent = function(event) {
    fixCover(event);
    formatDate(event);
    return event;
  };
  //make API call, if event template is included
  if ($eventTemplate.length > 0)  {
    FB.api(
        '/' + userId + '/events',
        {
          access_token: accessToken,
          fields: 'id, name, start_time, cover, description, place'
        },
        function (response) {
          if (response && !response.error) {
            //current events are events.true, past events are events.false
            var events = response.data;
            //Make sure each event is rendered correctly before rendering template
            _.each(events, formatEvent);
            events = _.groupBy(response.data, function(event){
              return (event.start_time > Date.now());
            });
            //compile template
            var eventsTemplate = _.template($eventTemplate.html());
            $currentEvents.append(eventsTemplate(events.true));
            $pastEvents.append(eventsTemplate(events.false));
          }
        }
    );
  }
};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));