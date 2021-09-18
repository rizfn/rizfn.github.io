var btn = document.getElementById("playbutton")
var aud = document.getElementById("amberamour")
var pic = document.getElementById("ollie")


function toggleState() {
    if (btn.innerText == "\u2BC8")
    {
      btn.innerText = "\u23F8\uFE0E";
      aud.play();
      pic.src="img/ollie_playing.gif";
    }
    else 
    {
      btn.innerText = "\u2BC8";
      aud.pause();
      pic.src="img/ollie_static.png";
    }
  }
