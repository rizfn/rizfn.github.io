var btn = document.getElementById("playbutton")
var aud = document.getElementById("amberamour")
var pic = document.getElementById("ollie")


function toggleState() {
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
  }
