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

  var liberlheight = document.getElementById("liberlbg").offsetHeight
  var crossbellheight = document.getElementById("crossbellbg").offsetHeight
  var pinheight = document.getElementById("scrollprompt").offsetHeight + liberlheight + crossbellheight

  // pinning scene
  new ScrollMagic.Scene({
    triggerElement: "#headerelement", // where to start
    duration: pinheight, // how long for the scene to last
    triggerHook: 0  // when trigger passes the top of the screen
  })
  .setPin("#pinmusicelement")  // pin this
  .addIndicators({name: "ollie pin"}) // add indicators (requires plugin)
  .addTo(controller);

  // defining parallax animations
  parallaxliberl = gsap.to("#liberlbg", {y: 200, ease: Linear.easeNone});
  parallaxcrossbell = gsap.to("#crossbellbg", {y: 200, ease: Linear.easeNone});

  // parallax scene: liberl
  new ScrollMagic.Scene({
    triggerElement: "#liberlbg",
    duration: liberlheight,
    triggerHook: 0
  })
  .setTween(parallaxliberl)
  .addIndicators({name: "liberl parallax"})
  .addTo(controller);

  // parallax scene: crossbell
  new ScrollMagic.Scene({
    triggerElement: "#crossbellbg",
    duration: crossbellheight,
    triggerHook: 0
  })
  .setTween(parallaxcrossbell)
  .addIndicators({name: "crossbell parallax"})
  .addTo(controller);
  

};


document.addEventListener('DOMContentLoaded', function() { // runs only when the page is loaded
  scroll();
}, false);


