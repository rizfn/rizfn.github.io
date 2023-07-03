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

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('amberamour');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();

// Bind our analyser to the media element source.
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var frequencyData = new Uint8Array(analyser.frequencyBinCount)

let svgWidth = 1000;
let svgHeight = 500;
let barPadding = 0.1;

var svg = d3.select("#visualizer").append("svg").attr("width", svgWidth).attr("height", svgHeight);

svg.append('g')
    .selectAll('rect')
    .data(frequencyData)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
    return i * (svgWidth / frequencyData.length);
    })
    .attr('width', svgWidth / frequencyData.length - barPadding);

function renderChart() {
    requestAnimationFrame(renderChart);

    // Copy frequency data to frequencyData array.
    analyser.getByteFrequencyData(frequencyData);

    // Update d3 chart with new data.
    svg.selectAll('rect')
       .data(frequencyData)
       .attr('y', function(d) {
          return svgHeight - d;
       })
       .attr('height', function(d) {
          return d;
       })
       .attr('fill', function(d) {
          return 'rgb(0, 0, ' + d + ')';
       });
 }

 // Run the loop
 renderChart();

