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

const angles = [85, 70, 89, 80]; // Angles for each quadrant

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

function setInitialCoordinates() {
    const midX = canvas.clientWidth / 4;
    const midY = canvas.clientHeight / 2;
    const quarterWidth = canvas.clientWidth / 4;
    const quarterHeight = canvas.clientHeight / 4;
    const horizontalSpacing = 10; // Add a little horizontal space between columns
    const verticalSpacing = 5; // Add a little vertical space between rows

    return [
        [[midX - quarterWidth - horizontalSpacing, midY - quarterHeight - verticalSpacing], [midX + quarterWidth - horizontalSpacing, midY - quarterHeight - verticalSpacing]], // Top-left
        [[midX - quarterWidth - horizontalSpacing, midY + quarterHeight + verticalSpacing], [midX + quarterWidth - horizontalSpacing, midY + quarterHeight + verticalSpacing]], // Bottom-left
        [[midX + quarterWidth + horizontalSpacing, midY - quarterHeight - verticalSpacing], [midX + 3 * quarterWidth + horizontalSpacing, midY - quarterHeight - verticalSpacing]], // Top-right
        [[midX + quarterWidth + horizontalSpacing, midY + quarterHeight + verticalSpacing], [midX + 3 * quarterWidth + horizontalSpacing, midY + quarterHeight + verticalSpacing]]  // Bottom-right
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

// Function to generate the next iteration of the Cesàro curve
function generateNextIteration(points, angle) {
    const angleRad = angle * Math.PI / 180;
    const newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];

        const dx = x2 - x1;
        const dy = y2 - y1;

        const segmentAngle = Math.atan2(dy, dx);
        const legLength = Math.sqrt(dx * dx + dy * dy) / (2 + 2 * Math.cos(angleRad));

        const x3 = x1 + legLength * Math.cos(segmentAngle);
        const y3 = y1 + legLength * Math.sin(segmentAngle);

        const x5 = x2 - legLength * Math.cos(segmentAngle);
        const y5 = y2 - legLength * Math.sin(segmentAngle);

        const x4 = x3 + legLength * Math.cos(segmentAngle + angleRad);
        const y4 = y3 + legLength * Math.sin(segmentAngle + angleRad);

        newPoints.push([x1, y1], [x3, y3], [x4, y4], [x5, y5]);
    }
    newPoints.push(points[points.length - 1]);
    return newPoints;
}

// Function to draw the Cesàro curve
function drawCesaroCurve(points) {
    for (let i = 0; i < points.length - 1; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        drawLine(x1, y1, x2, y2);
    }
}

// Initial points for the Cesàro curves
let initialPoints = setInitialCoordinates();
let pointsArray = initialPoints.map((points, index) => ({
    points,
    angle: angles[index]
}));

// Event listener for spacebar key press
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (iteration < maxIteration) {
            pointsArray = pointsArray.map(({ points, angle }) => ({
                points: generateNextIteration(points, angle),
                angle
            }));
            iteration++;
        } else {
            initialPoints = setInitialCoordinates();
            pointsArray = initialPoints.map((points, index) => ({
                points,
                angle: angles[index]
            }));
            iteration = 0;
        }
        drawAllCesaroCurves();
    }
});

// Function to draw all Cesàro curves
function drawAllCesaroCurves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(panX, panY); // Apply panning
    ctx.scale(scale, scale); // Apply the current scale
    ctx.scale(1, -1); // Invert the y-axis
    ctx.translate(0, -canvas.height/1.25); // Translate to adjust the drawing area
    pointsArray.forEach(({ points }) => drawCesaroCurve(points));
    ctx.restore();
}

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
    drawAllCesaroCurves();
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
        drawAllCesaroCurves();
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
        initialPoints = setInitialCoordinates();
        pointsArray = initialPoints.map((points, index) => ({
            points,
            angle: angles[index]
        }));
        drawAllCesaroCurves();
    }
}

function adjustCanvasSizeAndPosition() {
    canvas.style.width = '90%'; // Adjust the width to fit better on the screen
    canvas.style.height = '95%'; // Adjust the height to fit better on the screen
    canvas.style.margin = 'auto'; // Center the canvas horizontally
    canvas.style.display = 'block'; // Ensure the canvas is displayed as a block element
}

adjustCanvasSizeAndPosition();
initializeCanvas();
window.addEventListener('resize', initializeCanvas);