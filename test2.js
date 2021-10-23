gsap.registerPlugin(ScrollTrigger);

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

function scroll() { // for ScrollTrigger animations

  var liberlheight = document.getElementById("liberlbg").offsetHeight
  var crossbellheight = document.getElementById("crossbellbg").offsetHeight
  var pinheight = document.getElementById("scrollprompt").offsetHeight + liberlheight + crossbellheight

  // pinning olivier
  ScrollTrigger.create({
    trigger: "#pinmusicelement",
    start: "center center", // middle of the element is at middle of viewport
    end: "+="+pinheight,
    pin: "#pinmusicelement"
  });

  // parallax liberl bg
  gsap.to("#liberlbg", { // defining the GSAP animation
    y: 200, // just lower the height
    scrollTrigger: {
      trigger: "#liberlbg",  // element that causes the animation to play
      start: "top top",  // top of trigger element hits the top of viewport
      end: "bottom top", // bottom of trigger element at the top of viewport
      scrub: true,  // animates on scroll (otherwise animation happens instantly after scrolling point is met)
      markers: true,  // help debugging
      id: "liberl"  // labels markers
    }});

  // parallax crossbell bg
  gsap.to("#crossbellbg", {
    y: 200, 
    scrollTrigger: {
      trigger: "#crossbellbg",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: true,
      id: "crossbell"
    }});

};

document.addEventListener('DOMContentLoaded', function() { // runs only when the page is loaded
  scroll();
}, false);


