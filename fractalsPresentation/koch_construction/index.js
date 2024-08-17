// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let scale = 1; // Initial scale
const scaleFactor = 1.1; // Scale factor for zooming
let panX = 0; // Initial pan offset X
let panY = 0; // Initial pan offset Y
let isPanning = false; // Flag to track panning state
let startX, startY; // Starting coordinates for panning

const maxIteration = 7; // Maximum iteration count
let iteration = 0; // Initial iteration count

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
function setInitialCoordinates() {
    const startX = canvas.clientWidth / 5;
    const endX = canvas.clientWidth * 4 / 5;
    const startY = canvas.clientHeight / 2;
    const endY = canvas.clientHeight / 2;
    return [
        [startX, startY],
        [endX, endY]
    ];
}

// Function to draw a line
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 1 / scale; // Adjust line width based on scale
    ctx.strokeStyle = 'black'; // Set the line color
    ctx.stroke();
}

// Function to generate the next iteration of the Koch curve
function generateNextIteration(points) {
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
function drawKochCurve(points) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(panX, panY); // Apply panning
    ctx.scale(scale, scale); // Apply the current scale
    for (let i = 0; i < points.length - 1; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        drawLine(x1, y1, x2, y2);
    }
    ctx.restore();
}

// Initial points for the Koch curve
let points = setInitialCoordinates();

// Event listener for spacebar key press
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (iteration < maxIteration) {
            points = generateNextIteration(points);
            iteration++;
        } else {
            points = setInitialCoordinates();
            iteration = 0;
        }
        drawKochCurve(points);
    }
});

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
    drawKochCurve(points);
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
        drawKochCurve(points);
    }
});

canvas.addEventListener('mouseup', () => {
    isPanning = false;
});

canvas.addEventListener('mouseout', () => {
    isPanning = false;
});

// Initial canvas setup and drawing
function initializeCanvas() {
    if (resizeCanvasToDisplaySize(canvas)) {
        points = setInitialCoordinates();
        drawKochCurve(points);
    }
}

initializeCanvas();
window.addEventListener('resize', initializeCanvas);