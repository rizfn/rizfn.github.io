function toggleRadio(i) {
    document.getElementById("radio"+i).checked = true;
    updateData()
}

document.addEventListener("keydown", function(e) {
    if (e.key == 1 || e.key == 2 || e.key == 3) {
        toggleRadio(e.key)
    }
})

var svg = d3.select("div#chart1")
    .append("svg")
    .attr("id", "bar-chart")
    .attr("width", "960")
    .attr("height", "300");


var margin = {top: 20, right: 20, bottom: 30, left: 40},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data/group_reasons.csv", function(d) {
    console.log(d)
    d.counts = +d.counts;
    return d;
    }, function(error, data) {
        if (error) throw error;

        filtered_data = data.filter(function(d) {
            console.log(document.querySelector('input[name="wave-filter"]:checked').value)
            return d.wave === document.querySelector('input[name="wave-filter"]:checked').value
            });
        console.log(filtered_data)

        var tots = d3.sum(filtered_data, function(d) { 
            return d.counts; 
        });

        filtered_data.forEach(function(d) {
            d.prop = d.counts  / tots;
        });
        
        x.domain(filtered_data.map(function(d) { return d.reason; }));
        y.domain([0, d3.max(filtered_data, function(d) { return d.prop; })]);

        var Tooltip = d3.select("div#chart1")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")

        var mouseover = function(d) {
            Tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("fill", "rgb(206, 243, 42)")
        }
        var mousemove = function(d) {
            Tooltip
                .html(d.wave + ", " + d.reason + "<br>" + d3.format(".2%")(d.prop))
                .style("left", (d3.mouse(this)[0]+60) + "px")
                .style("top", (d3.mouse(this)[1]+40) + "px")
        }
        var mouseleave = function(d) {
            Tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("fill", "rgb(60, 223, 223)")
        }



        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, '%'))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Percentage");

        g.selectAll(".bar")
            .data(filtered_data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.reason); })
            .attr("y", function(d) { return y(d.prop); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.prop); })
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);
    });


// SECOND BAR CHART

var svg2 = d3.select("div#chart2")
    .append("svg")
    .attr("id", "bar-chart-2")
    .attr("width", "960")
    .attr("height", "300");

var x2 = d3.scaleBand().rangeRound([0, width]).padding(0.1),
y2 = d3.scaleLinear().rangeRound([height, 0]);

var g2 = svg2.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data/group_reasons.csv", function(d) {
    console.log(d)
    d.counts = +d.counts;
    return d;
    }, function(error, data) {
        if (error) throw error;

        y2.domain([0, d3.max(data, function(d) { return d.counts; })]);

        filtered_data = data.filter(function(d) {
            console.log(document.querySelector('input[name="wave-filter"]:checked').value)
            return d.wave === document.querySelector('input[name="wave-filter"]:checked').value
            });
        console.log(filtered_data)

        x2.domain(filtered_data.map(function(d) { return d.reason; }));


        var Tooltip = d3.select("div#chart2")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        var mouseover = function(d) {
            Tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("fill", "rgb(206, 243, 42)")
        }
        var mousemove2 = function(d) {
            Tooltip
                .html(d.wave + ", " + d.reason + "<br>" + d.counts)
                .style("left", (d3.mouse(this)[0]+60) + "px")
                .style("top", (d3.mouse(this)[1]+345) + "px")
        }
        var mouseleave = function(d) {
            Tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("fill", "deeppink")
        }

        g2.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x2));

        g2.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y2))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");

        g2.selectAll(".bar")
            .data(filtered_data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x2(d.reason); })
            .attr("y", function(d) { return y2(d.counts); })
            .attr("width", x2.bandwidth())
            .attr("height", function(d) { return height - y2(d.counts); })
            .on("mouseover", mouseover)
            .on("mousemove", mousemove2)
            .on("mouseleave", mouseleave);

    });

// UPDATE FUNCTION


function updateData () {
    d3.csv("data/group_reasons.csv",
        function(d) {
            d.counts = +d.counts;
            return d;
        },
        function(error, data) {
            if (error) throw error;

            filtered_data = data.filter(function(d) {
                console.log(document.querySelector('input[name="wave-filter"]:checked').value)
                return d.wave === document.querySelector('input[name="wave-filter"]:checked').value
            });

            var tots = d3.sum(filtered_data, function(d) { 
                return d.counts; 
            });

            filtered_data.forEach(function(d) {
                d.prop = d.counts  / tots;
            });
            
    
            const t = d3.transition().duration(750)

            x.domain(filtered_data.map(function(d) { return d.reason; }));
            y.domain([0, d3.max(filtered_data, function(d) { return d.prop; })]);

            g.selectAll(".bar")
                .data(filtered_data)
                .transition(t)
                .attr("x", function(d) { return x(d.reason); })
                .attr("y", function(d) { return y(d.prop); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.prop); });

            g.select(".axis--x")
                .transition(t)
                .call(d3.axisBottom(x));

            g.select(".axis--y")
                .transition(t)
                .call(d3.axisLeft(y).ticks(10, '%'));


            g2.selectAll(".bar")
                .data(filtered_data)
                .transition(t)
                .attr("x", function(d) { return x2(d.reason); })
                .attr("y", function(d) { return y2(d.counts); })
                .attr("width", x2.bandwidth())
                .attr("height", function(d) { return height - y2(d.counts); });

        });

}

