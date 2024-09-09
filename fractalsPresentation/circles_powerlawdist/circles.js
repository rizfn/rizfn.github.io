// Set up the SVG dimensions and margins
const width = window.innerWidth / 2;
const height = window.innerHeight;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

// Number of circles
const N_circles = 300;

// Create SVG containers
const svgUniform = d3.select("#uniform_circles")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const svgPowerLaw = d3.select("#powerlawcircles")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Generate non-overlapping circles
function generateCircles(distribution) {
    const circles = [];
    const maxAttempts = 100000;
    let attempts = 0;

    while (circles.length < N_circles && attempts < maxAttempts) {
        const radius = distribution();
        const x = Math.random() * (width - 2 * radius) + radius;
        const y = Math.random() * (height - 2 * radius) + radius;

        const overlapping = circles.some(circle => {
            const dx = circle.x - x;
            const dy = circle.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < circle.radius + radius;
        });

        if (!overlapping) {
            circles.push({ x, y, radius });
        }

        attempts++;
    }

    return circles;
}

// Uniform distribution
function uniformDistribution() {
    return Math.random() * 10 + 1;
}

// Power law distribution
function powerLawDistribution() {
    return Math.pow(Math.random(), -1.5) * 1; // Adjust the multiplier for desired range
}

// Draw circles on SVG
function drawCircles(svg, circles) {
    svg.selectAll("circle")
        .data(circles)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.radius)
        .attr("fill", "steelblue")
        .attr("opacity", 0.7);
}

// Add zoom functionality
function addZoom(svg) {
    const zoom = d3.zoom()
        .scaleExtent([0.5, 10])
        .on("zoom", (event) => {
            svg.attr("transform", event.transform);
        });

    d3.select(svg.node().parentNode)
        .call(zoom);
}

// Generate and draw circles
const uniformCircles = generateCircles(uniformDistribution);
const powerLawCircles = generateCircles(powerLawDistribution);

drawCircles(svgUniform, uniformCircles);
drawCircles(svgPowerLaw, powerLawCircles);

addZoom(svgUniform);
addZoom(svgPowerLaw);