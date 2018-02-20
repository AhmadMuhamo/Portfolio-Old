var streamers = ["ESL_DOTA2", "DreamLeague", "wagamamatv", "singsing", "dota2ti", "beyondthesummit", "freecodecamp"];
var logo = '';
var name = '';
var game = '';
var streamName = '';

for(let stream of streamers)  {
  $.ajax({
      url: "https://wind-bow.glitch.me/twitch-api/streams/"+stream,
      success: function(response) {
        if(response.stream!=null){
          logo = response.stream.channel.logo
          name = response.stream.channel.display_name;
          game = response.stream.game;
          streamName = response.stream.channel.status;
          if(streamName.length >= 50) streamName = streamName.substr(0,50)+"...";
          
          $(".online-streamers").append("<a target='_blank' class='online-link' href='https://www.twitch.tv/"+name+"'><div class='online d-flex align-items-center mx-auto'><img class='ml-1 streamer-img' src='"+logo+"'/><p class='ml-5 mr-2'>"+name+"</p><p class='mx-auto'>"+game+' - '+streamName+"</p></div></a>");
        }else {
          $.ajax({
            url: "https://wind-bow.glitch.me/twitch-api/users/"+stream,
            success: function(response) {
            logo = response.logo;
            name = response.display_name;
        
          $(".offline-streamers").append("<div class='offline d-flex align-items-center'><img class='ml-1 streamer-img' src='"+logo+"'/><p class='ml-5 mr-2'>"+name+"</p><p class='ml-auto mr-5 text-center'>Offline</p></div>");
      }
          });
        }
      }
  });
}

$("#online-btn").click(function(){
  $(".online-streamers").show(200);
  $(".offline-streamers").hide(200);
});
$("#offline-btn").click(function(){
  $(".online-streamers").hide(200);
  $(".offline-streamers").show(200);
});
$("#all-btn").click(function(){
  $(".online-streamers").show(200);
  $(".offline-streamers").show(200);
});
