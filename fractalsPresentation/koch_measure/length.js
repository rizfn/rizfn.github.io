// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let scale = 1; // Initial scale
const scaleFactor = 1.1; // Scale factor for zooming
let panX = 0; // Initial pan offset X
let panY = 0; // Initial pan offset Y
let isPanning = false; // Flag to track panning state
let startX, startY; // Starting coordinates for panning
const kochMaxIteration = 7; // Maximum iteration count
let redIteration = 0; // Initial iteration for red curve

// Function to resize the canvas to match its display size
function resizeCanvasToDisplaySize(canvas) {
    const pixelRatio = window.devicePixelRatio || 1;
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        canvas.width = width;
        canvas.height = height;
        ctx.scale(pixelRatio, pixelRatio);
    }
    return needResize;
}

// Function to set initial line coordinates
function setInitialCoordinates(offsetY = 0) {
    const startX = canvas.clientWidth / 5;
    const endX = canvas.clientWidth * 4 / 5;
    const startY = canvas.clientHeight / 2 + offsetY;
    const endY = canvas.clientHeight / 2 + offsetY;
    return [
        [startX, startY],
        [endX, endY]
    ];
}

// Function to draw a line
function drawLine(x1, y1, x2, y2, color = 'black', lineWidth = 1) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineWidth / scale; // Adjust line width based on scale
    ctx.strokeStyle = color; // Set the line color
    ctx.stroke();
}

// Function to generate the next iteration of the Koch curve
function generateKochNextIteration(points) {
    const newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];

        const dx = x2 - x1;
        const dy = y2 - y1;

        const x3 = x1 + dx / 3;
        const y3 = y1 + dy / 3;

        const x5 = x1 + 2 * dx / 3;
        const y5 = y1 + 2 * dy / 3;

        const angle = -Math.PI / 3; // Flip the direction
        const x4 = x3 + (x5 - x3) * Math.cos(angle) - (y5 - y3) * Math.sin(angle);
        const y4 = y3 + (x5 - x3) * Math.sin(angle) + (y5 - y3) * Math.cos(angle);

        newPoints.push([x1, y1], [x3, y3], [x4, y4], [x5, y5]);
    }
    newPoints.push(points[points.length - 1]);
    return newPoints;
}

// Function to draw the Koch curve
function drawKochCurve(points, color = 'black', lineWidth = 1) {
    for (let i = 0; i < points.length - 1; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        drawLine(x1, y1, x2, y2, color, lineWidth);
    }
}

// Initial points for the Koch curve
let points = setInitialCoordinates();
let redPoints = setInitialCoordinates(2);

// Generate 7 iterations of the Koch curve
for (let i = 0; i < kochMaxIteration; i++) {
    points = generateKochNextIteration(points);
}

// Draw the final Koch curve
function initializeCanvas() {
    if (resizeCanvasToDisplaySize(canvas)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.save();
    ctx.translate(panX, panY); // Apply panning
    ctx.scale(scale, scale); // Apply the current scale
    drawKochCurve(points); // Draw the black Koch curve
    drawKochCurve(redPoints, 'red', 2); // Draw the red Koch curve
    ctx.restore();
}

// Initial draw
initializeCanvas();
window.addEventListener('resize', initializeCanvas);

// Event listener for mouse wheel to handle zooming
canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    const zoom = event.deltaY < 0 ? scaleFactor : 1 / scaleFactor;
    const newScale = scale * zoom;

    // Calculate the new pan offsets to zoom into the mouse cursor
    panX = mouseX - (mouseX - panX) * (newScale / scale);
    panY = mouseY - (mouseY - panY) * (newScale / scale);

    scale = newScale;
    initializeCanvas();
});

// Event listeners for panning
canvas.addEventListener('mousedown', (event) => {
    isPanning = true;
    startX = event.clientX - panX;
    startY = event.clientY - panY;
});

canvas.addEventListener('mousemove', (event) => {
    if (isPanning) {
        panX = event.clientX - startX;
        panY = event.clientY - startY;
        initializeCanvas();
    }
});

canvas.addEventListener('mouseup', () => {
    isPanning = false;
    initializeCanvas();
});

canvas.addEventListener('mouseout', () => {
    isPanning = false;
    initializeCanvas();
});

segmentLength = d3.select("#segmentLength");
segmentN = d3.select("#segmentN");
totalLength = d3.select("#totalLength");

// Event listener for spacebar key press
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (redIteration < kochMaxIteration) {
            redPoints = generateKochNextIteration(redPoints);
            redIteration++;
        } else {
            redPoints = setInitialCoordinates(2);
            redIteration = 0;
        }
        initializeCanvas();
        updateGraph();
        segmentLength.text(d3.format(".2E")(Math.pow(1 / 3, redIteration)));
        segmentN.text(d3.format(".2d")(Math.pow(4, redIteration)));
        totalLength.text(d3.format(".3f")(Math.pow(4 / 3, redIteration)));
    }
});

// Select the SVG element
const svg = d3.select("svg");

// Get the actual width and height of the SVG element
const svgWidth = svg.node().getBoundingClientRect().width;
const svgHeight = svg.node().getBoundingClientRect().height;

const margin = { top: 50, right: 30, bottom: 40, left: 80 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create a group element for the graph and apply the margins
const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// Set up the scales for the graph
const x = d3.scaleLinear().domain([0, kochMaxIteration + 1]).range([0, width]);
const y = d3.scaleLinear().domain([0, Math.pow(4 / 3, kochMaxIteration)]).range([height, 0]);

// Add the x-axis to the graph
g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(kochMaxIteration + 1).tickFormat(d3.format("d")));

// Add the y-axis to the graph
g.append("g")
    .call(d3.axisLeft(y));

// Add labels to the axes
g.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .attr("dy", "-0.5em")
    .style("text-anchor", "middle")
    .text("Iteration");

g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left / 1.5)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Length");

// initial draw
updateGraph();

// Function to update the graph
function updateGraph() {
    let graphData = [];
    for (let i = 0; i <= redIteration; i++) {
        graphData.push({ iteration: i + 1, length: Math.pow(4 / 3, i) });
    }
    // Bind the data to the circles
    const circles = g.selectAll("circle").data(graphData);

    // Enter new circles
    circles.enter().append("circle")
        .attr("cx", d => x(d.iteration))
        .attr("cy", d => y(d.length))
        .attr("r", 5)
        .style("fill", "red");

    // Update existing circles
    circles
        .attr("cx", d => x(d.iteration))
        .attr("cy", d => y(d.length));

    // Remove old circles
    circles.exit().remove();
}

