function toggleState() { // on clicking the play button in olivier's pic

  var btn = document.getElementById("playbutton")
  var aud = document.getElementById("amberamour")
  var pic = document.getElementById("ollie")

  if (btn.innerHTML.trim() == '<i class="material-icons">play_arrow</i>')  // trim removes whitespace
  {
    btn.innerHTML = '<i class="material-icons">pause</i>';
    aud.play();
    pic.src="img/ollie_playing.gif";
  }
  else 
  {
    btn.innerHTML = '<i class="material-icons">play_arrow</i>';
    aud.pause();
    pic.src="img/ollie_static.png";
  }
};


function scroll() { // used for scrollmagic
  var controller = new ScrollMagic.Controller();

  var height = document.getElementById("item3").offsetHeight

  var scene = new ScrollMagic.Scene({
    triggerElement: "#item1", // where to start
    duration: height, // how long for the scene to last
    triggerHook: 0  // when trigger passes the top of the screen
  })
  .setPin("#item2")  // pin this
  .addIndicators({name: "controller"}) // add indicators (requires plugin)
  .addTo(controller);
};


document.addEventListener('DOMContentLoaded', function() { // runs only when the page is loaded
  scroll();    
}, false);


