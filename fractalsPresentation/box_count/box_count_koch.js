function box_count(canvas) {
    let ctx = canvas.getContext("2d");
    let im_data = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let cnts = [];
    for (let s = Math.min(canvas.width, canvas.height); s >= 1; s = Math.floor(s / 2)) {
        let boxes = [];
        let cnt = 0;
        for (let i = 0; s * (i + 1) <= canvas.height; i++) {
            for (let j = 0; s * (j + 1) <= canvas.width; j++) {
                if (check_box(i, j, s)) {
                    cnt = cnt + 1;
                    boxes.push([i, j]);
                }
            }
        }
        cnts.push({ s: s, cnt: cnt, boxes: boxes });
    }

    function check_box(i, j, s) {
        for (let i0 = i * s; i0 < (i + 1) * s; i0++) {
            for (let j0 = j * s; j0 < (j + 1) * s; j0++) {
                let ij0 = 4 * (j0 + i0 * canvas.width);
                if (
                    im_data.data[ij0] < 100 &&
                    im_data.data[ij0 + 1] < 100 &&
                    im_data.data[ij0 + 2] < 100 &&
                    im_data.data[ij0 + 3] > 155
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    return cnts;
}

function drawBoxes(canvas, cnts, n) {
    let svg = d3.select("#box-container");
    svg.selectAll("*").remove();

    if (n < cnts.length) {
        let s = cnts[n].s;
        let boxes = cnts[n].boxes;
        let w = canvas.width;
        let h = canvas.height;

        svg.selectAll("rect")
            .data(boxes)
            .enter()
            .append("rect")
            .attr("x", d => (d[1] * s / w) * 100 + "%")
            .attr("y", d => (d[0] * s / h) * 100 + "%")
            .attr("width", (s / w) * 100 + "%")
            .attr("height", (s / h) * 100 + "%")
            .attr("opacity", 0.2)
            .attr("stroke", "white")
            .attr("stroke-width", 1);
    }
}

function drawRegressionPlot(cnts) {
    // Prepare the data
    cnts.forEach(function (o) {
        o["log s"] = Math.log(o.s);
        o["log cnt"] = Math.log(o.cnt);
    });

    let regression = linearRegression(cnts.map(d => d["log s"]), cnts.map(d => d["log cnt"]));

    // Set up the SVG and margins
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#regression-plot")
        .html("") // Clear any existing content
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleLog()
        .domain(d3.extent(cnts, d => d.s))
        .range([0, width]);

    const yScale = d3.scaleLog()
        .domain(d3.extent(cnts, d => d.cnt))
        .range([height, 0]);

    // Add axes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(10, ".0s"));

    svg.append("g")
        .call(d3.axisLeft(yScale).ticks(10, ".0s"));

    // Add data points
    svg.selectAll("circle")
        .data(cnts)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.s))
        .attr("cy", d => yScale(d.cnt))
        .attr("r", 3)
        .attr("fill", "red");

    // Add regression line
    const xMin = d3.min(cnts, d => d.s);
    const xMax = d3.max(cnts, d => d.s);
    const yMin = Math.exp(regression.b + regression.m * Math.log(xMin));
    const yMax = Math.exp(regression.b + regression.m * Math.log(xMax));

    svg.append("line")
        .attr("x1", xScale(xMin))
        .attr("y1", yScale(yMin))
        .attr("x2", xScale(xMax))
        .attr("y2", yScale(yMax))
        .attr("stroke", "black");

    // Display regression equation in plain text
    let equation = `log(N) ≈ ${d3.format(".3f")(regression.b)} + ${d3.format(".3f")(regression.m)} log(ε)`;
    document.getElementById('regression-equation').innerText = equation;
}

function linearRegression(x, y) {
    let n = x.length;
    let sum_x = d3.sum(x);
    let sum_y = d3.sum(y);
    let sum_xx = d3.sum(x.map(d => d * d));
    let sum_xy = d3.sum(x.map((d, i) => d * y[i]));

    let m = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    let b = (sum_y - m * sum_x) / n;

    return { m, b };
}

// Load image and draw on canvas
let img = new Image();
img.src = '../fig/IUP/koch.png'; // Replace with your image URL
img.onload = function () {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let cnts = box_count(canvas);
    drawBoxes(canvas, cnts, 0); // Draw boxes for the first iteration
    drawRegressionPlot(cnts);

    // Add event listener for the slider
    let slider = document.getElementById('box-slider');
    slider.max = cnts.length - 1;
    slider.addEventListener('input', function () {
        drawBoxes(canvas, cnts, +this.value);
    });
};