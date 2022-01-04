var margin = {top:10, left:60, bottom:30, right:30},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.left - margin.right

var svg = d3.select("div#scatterplot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/bruno_changes.csv", function(data) {
    filtered_data = data.filter(function(d) {
        return (d.season === "2021" && d.time > 90);
        // console.log(document.querySelector('input[name="wave-filter"]:checked').value)
        // return d.wave === document.querySelector('input[name="wave-filter"]:checked').value
        });
    console.log(filtered_data);


    var x = d3.scaleLinear()
        .domain([0, d3.max(filtered_data, function(d){return d.xGp90;})])
        .range([0, width])
    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    var y = d3.scaleLinear()
        .domain([0, d3.max(filtered_data, function(d){return d.xAp90;})])
        .range([ height, 0]);
      svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    var datapoints = svg.selectAll(".datapoint")
        .data(filtered_data)
        .enter();
    
    datapoints.append("circle")
            .attr("class", "datapoint circle-data")
            .attr("cx", function (d) {return x(d.xGp90);})
            .attr("cy", function (d) {return y(d.xAp90);})
            .attr("r", function (d) {return (d.time/3)**0.5;})
            // .attr("r", "10px")
            .style("stroke", "black")
            .style("fill",  "rgba(253,185,19, 0.8)")
    datapoints.append("text")
            .attr("class", "datapoint, text-data")
            .attr("x", function (d) {return x(d.xGp90);})
            .attr("y", function (d) {return y(d.xAp90);})
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text(function (d) {return d.number;});

})

function updateData() {
    d3.csv("data/bruno_changes.csv", function(data) {

        filtered_data = data.filter(function(d) {
            return (d.season === "2020" && d.time > 90);
            });
        console.log(filtered_data)

        const t = d3.transition().duration(1000)

        var x = d3.scaleLinear()
            .domain([0, d3.max(filtered_data, function(d){return d.xGp90;})])
            .range([0, width])
            
        var y = d3.scaleLinear()
            .domain([0, d3.max(filtered_data, function(d){return d.xAp90;})])
            .range([ height, 0]);

        svg.selectAll(".axis--x")
            .transition(t)
            .call(d3.axisBottom(x));
        svg.selectAll(".axis--y")
            .transition(t)
            .call(d3.axisLeft(y));
    

        svg.selectAll(".circle-data")
            .data(filtered_data)
            .transition(t)
            .attr("cx", function (d) {return x(d.xGp90);})
            .attr("cy", function (d) {return y(d.xAp90);})
            .attr("r", function (d) {return (d.time/3)**0.5;});

        svg.selectAll(".text-data")
            .data(filtered_data)
            .transition(t)
            .attr("x", function (d) {return x(d.xGp90);})
            .attr("y", function (d) {return y(d.xAp90);})
            .text(function (d) {return d.number;});
            // .attr("text-anchor", "middle")
            // .attr("alignment-baseline", "middle")

    })
}
