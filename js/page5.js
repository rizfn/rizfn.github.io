function toggleSeason(i) {
    document.getElementById("radio-"+i).checked = true;
    updateData();
  }  

var margin = {top:50, left:60, bottom:30, right:30},
    width = 1000 - margin.left - margin.right,
    height = 620 - margin.left - margin.right

var svg = d3.select("div#scatterplot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/bruno_changes.csv").then(function(data) {

    filtered_data = data.filter(function(d) {
        return (d.season === "2020" && d.time > 90);
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
        .data(filtered_data, function(d) {return d.number;});

    var Tooltip = d3.select("div#scatterplot")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip");
    
    var mouseover = function(event, d) {
        Tooltip
            .style("opacity", 1);
      }
    var mousemove = function(event, d) {
        Tooltip
            .html(d.player+"<br>Mins: "+d.time+"<br>xG: "+d3.format("0.4")(d.xG)+"<br>xA: "+d3.format("0.4")(d.xA))
            .style("left", (d3.pointer(event)[0] + 80) + "px")
            .style("top", (d3.pointer(event)[1] + 30) + "px")
      }
    var mouseleave = function(event, d) {
        Tooltip
            .style("opacity", 0);
      }

    
    
    datapoints.join("circle")
            .attr("class", "datapoint circle-data")
            .attr("cx", function (d) {return x(d.xGp90);})
            .attr("cy", function (d) {return y(d.xAp90);})
            .attr("r", function (d) {return (d.time/3)**0.5;})
            .style("stroke", "black")
            .style("fill",  "rgba(253,185,19, 0.8)")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);
    
    datapoints.join("text")
            .attr("class", "datapoint text-data")
            .attr("x", function (d) {return x(d.xGp90);})
            .attr("y", function (d) {return y(d.xAp90);})
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text(function (d) {return d.number;})
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);


})

function updateData() {
    d3.csv("data/bruno_changes.csv").then(function(data) {

        filtered_season = document.querySelector('input[name="season-selector"]:checked').value

        filtered_data = data.filter(function(d) {
            return (d.season === filtered_season && d.time > 90);
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
            .data(filtered_data, function(d) {return d.number})
            .join(
                function (enter) {
                    return enter.append("circle")
                        .attr("class", "circle-data")
                        .attr("cx", function (d) {return x(d.xGp90);})
                        .attr("cy", function (d) {return y(d.xAp90);})
                        .attr("r", 0)
                        .style("stroke", "black")
                        .style("fill",  "rgba(253,185,19, 0.8)");
                },
                function (update) {
                    console.log(update.enter().size(), update.size(), update.exit().size());
                    return update;
                },
                function (exit) {
                    return exit.transition(t)
                        .attr("r", 0)
                        .on('end', function() {
                            d3.select(this).remove();
                        });
                }
            )
            .transition(t)
            .attr("cx", function (d) {return x(d.xGp90);})
            .attr("cy", function (d) {return y(d.xAp90);})
            .attr("r", function (d) {return (d.time/3)**0.5;})
            .style("stroke", "black")
            .style("fill",  "rgba(253,185,19, 0.8)");


        svg.selectAll(".text-data")
            .data(filtered_data, function(d) {return d.number})
            .join(
                function (enter) {
                    return enter.append("text")
                        .attr("class", "text-data")
                        .attr("x", function (d) {return x(d.xGp90);})
                        .attr("y", function (d) {return y(d.xAp90);})
                        .text(function (d) {return d.number;})
                        .attr("text-anchor", "middle")
                        .attr("alignment-baseline", "middle")
                        .attr("font-size", 0);
                },
                function (update) {
                    return update;
                },
                function(exit) {
                    return exit.transition(t)
                        .attr("font-size", "0em")
                        .on('end', function() {
                            d3.select(this).remove();
                        });
                }
            )
            .transition(t)
            .attr("x", function (d) {return x(d.xGp90);})
            .attr("y", function (d) {return y(d.xAp90);})
            .text(function (d) {return d.number;})
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("font-size", "1em");

    })
}

updateData()
