function togglePlayState() { // on clicking the play button in olivier's pic

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

function toggleMicState() { // on clicking the mic button in jonah's pic
    var btn = document.getElementById("micbutton")
    var pic = document.getElementById("tio")

    if (btn.innerHTML.trim() == '<i class="material-icons">mic</i>')  // trim removes whitespace
    {
        btn.innerHTML = '<i class="material-icons">mic_off</i>';
        micPromise = connectMicSource(analyser, audioCtx)
        pic.src="img/tio_channeling.gif";
    }
    else
    {
        btn.innerHTML = '<i class="material-icons">mic</i>';
        micPromise.then(micStream => {
            disconnectMicSource(micStream)
        })
        pic.src="img/tio_static.png";
    }
}

async function connectMicSource(analyser, audiocontext) {
    const micStream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});
    const mediaStream = new MediaStream(micStream.getAudioTracks());
    var micSrc = audiocontext.createMediaStreamSource(mediaStream);
    // Bind our analyser to the media element source.
    micSrc.connect(analyser);
    micSrc.connect(audiocontext.destination);
    return micStream;
}

function disconnectMicSource(micstream) {
    tracks = micstream.getAudioTracks()
    tracks.forEach(track => {
        track.stop()
    });
}


// amber amour audio src
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var amberAmourElement = document.getElementById('amberamour');
var amberAmourSrc = audioCtx.createMediaElementSource(amberAmourElement);
var analyser = audioCtx.createAnalyser();

// Bind our analyser to the media element source.
// analyser.fftSize = 1024;
amberAmourSrc.connect(analyser);
amberAmourSrc.connect(audioCtx.destination);



var frequencyData = new Uint8Array(analyser.frequencyBinCount);

let svgWidth = 800;
let svgHeight = 800;

let innerRadius = 100;
let outerRadius = Math.min(svgWidth, svgHeight) / 2;


var svg = d3.select("#visualizer").append("svg").attr("width", svgWidth).attr("height", svgHeight);

var x = d3.scaleLinear()
    .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
    .domain([0, 256]); // There is overlap!! but removing it would be too many bars and hard to resolve

var x_bandwidth = 2*Math.PI/256

var y = d3.scaleRadial()
    .range([innerRadius, outerRadius])
    .domain([0, 256]); // Domain of Y is from 0 to the max (uint8)

svg.append('g')
    .attr("transform", "translate(" + svgWidth / 2 + "," + ( svgHeight/2)+ ")")
    .selectAll('path')
    .data(frequencyData)
    .enter()
    .append('path')
    // .attr("fill", "#69b3a2")
    .attr("fill", function(d, i) {return "rgb(0, 0, " + i + ")";})
    .attr("d", d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(function(d) {return y(d);})
            .startAngle(function(d, i) {return x(i);})
            .endAngle(function(d, i) {return x(i) + x_bandwidth;})
            .padAngle(0.01)
            .padRadius(innerRadius));

        
function renderChart() {
    requestAnimationFrame(renderChart);

    // Copy frequency data to frequencyData array.
    analyser.getByteFrequencyData(frequencyData);

    // Update d3 chart with new data.
    svg.selectAll('path')
        .attr("fill", function(d, i) {return "rgb(0, 0, " + i + ")";})
        .data(frequencyData)
        .attr("d", d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(function(d) {return y(d);})
            .startAngle(function(d, i) {return x(i);})
            .endAngle(function(d, i) {return x(i) + x_bandwidth;})
            .padAngle(0.01)
            .padRadius(innerRadius));
}

// Run the loop
renderChart();

