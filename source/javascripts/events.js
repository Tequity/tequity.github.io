window.fbAsyncInit = function() {
  FB.init({
    appId      : '466742083508337',
    xfbml      : true,
    version    : 'v2.4'
  });
  $currentEvents = $('.events--current');
  var userId = '914825215215018';
  //Any type of access token will do for publicly available feeds.
  //So, use the test app token.
  var accessToken = '466742083508337|ftQ0MZwU3FuIRE8utKmlkokotqI';
  FB.api(
      '/' + userId + '/events',
      {
        access_token: accessToken,
        fields: 'id, name, start_time, cover, description, place'
      },
      function (response) {
        if (response && !response.error) {
          console.log(response);
          //current events are events.true, past events are events.false
          var events = response.data;
          _.each(events, function(event)  {
            if(!event.cover)  {
              event.cover = {
                source: 'https://scontent.xx.fbcdn.net/hphotos-xpt1/t31.0-8/s720x720/11875015_707333166064803_4306571724848990188_o.jpg'
              };
            }
          });
          events = _.groupBy(response.data, function(event){
            var eventDate = new Date(event.start_time);
            return (eventDate > Date.now());
          });
          //compile template
          var eventsTemplate = _.template($('.event--template').html());
          $('.events--current').append(eventsTemplate(events.true));
          $('.events--past').append(eventsTemplate(events.false));
        }
        else  {
          console.log(response.error);
        }
      }
  );
};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));