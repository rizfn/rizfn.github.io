function toggleState() {

  var btn = document.getElementById("playbutton")
  var aud = document.getElementById("amberamour")
  var pic = document.getElementById("ollie")

  if (btn.innerHTML == '<i class="material-icons">play_arrow</i>')
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

function scroll() {
  var controller = new ScrollMagic.Controller();

  var height = document.getElementById("item3").offsetHeight

  var scene = new ScrollMagic.Scene({
    triggerElement: "#item1",
    duration: height,
    triggerHook: 0
  })
  .setPin("#item2")
  .addIndicators({name: "controller"}) // add indicators (requires plugin)
  .addTo(controller);
};


document.addEventListener('DOMContentLoaded', function() {
  scroll();
}, false);


