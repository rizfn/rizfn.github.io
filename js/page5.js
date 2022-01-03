// set the dimensions and margins of the graph
var margin = {top: 40, right: 20, bottom: 40, left: 60},
  width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("div#heatmap")
  .append("svg")
    .attr("id", "age-assortativity")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


function getOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}
          

d3.csv("data/matrices/wave3_aa_num_contacts.csv", function(data) {
    console.log(data);
    // var rows = d3.map(data, function(d){return d.cont_age;}).keys()
    // console.log(rows)
    var cols = d3.map(data, function(d){return d.resp_age;}).keys()  
    console.log(cols)

    var x = d3.scaleBand()
        .range([0, width])
        .domain(cols)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleBand()
        .range([height, 0])
        .domain(cols)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y));

    
    var colors = d3.scaleSequential()
        .interpolator(d3.interpolateViridis)
        .domain([d3.min(data, function(d) {return d.count;}), d3.max(data, function(d) {return d.count;})])

    var Tooltip = d3.select("div#heatmap")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
    
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        Tooltip
          .style("opacity", 1)
          .style("position", "absolute")
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        var heatmap_location = getOffset(document.getElementById("age-assortativity"))
        Tooltip
          .html(d.resp_age + "," +d.cont_age + "<br>" + d3.format("0.4")(d.count))
          .style("left", (d3.mouse(this)[0] + heatmap_location.left + 70) + "px")
          .style("top", (d3.mouse(this)[1] + heatmap_location.top - 30) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
      }
    
    
    svg.selectAll()
        .data(data)
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.resp_age) })
          .attr("y", function(d) { return y(d.cont_age) })
          .attr("width", x.bandwidth() )
          .attr("height", y.bandwidth() )
          .style("fill", function(d) { return colors(d.count)} )
          .style("stroke-width", 4)
          .style("stroke", "none")
          .style("opacity", 0.8)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave);
})

// append the svg object to the body of the page
var svg_oe = d3.select("div#heatmap")
  .append("svg")
    .attr("id", "observed-expected")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/matrices/wave3_oe_num_contacts.csv", function(data) {
    console.log(data);
    // var rows = d3.map(data, function(d){return d.cont_age;}).keys()
    // console.log(rows)
    var cols_oe = d3.map(data, function(d){return d.resp_age;}).keys()  

    var x_oe = d3.scaleBand()
        .range([0, width])
        .domain(cols_oe)
        .padding(0.05);
    svg_oe.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x_oe));

    var y_oe = d3.scaleBand()
        .range([height, 0])
        .domain(cols_oe)
        .padding(0.05);
    svg_oe.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y_oe));

    
    var colors_oe = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([d3.min(data, function(d) {return d.count;}), d3.max(data, function(d) {return d.count;})])

    var Tooltip = d3.select("div#heatmap")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
    
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        Tooltip
          .style("opacity", 1)
          .style("position", "absolute")
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        var heatmap2_location = getOffset(document.getElementById("observed-expected"))
        Tooltip
          .html(d.resp_age + "," +d.cont_age + "<br>" + d3.format("0.4")(d.count))
          .style("left", (d3.mouse(this)[0] + heatmap2_location.left + 70) + "px")
          .style("top", (d3.mouse(this)[1] + heatmap2_location.top -30) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
      }
    
    
    svg_oe.selectAll()
        .data(data)
        .enter()
        .append("rect")
          .attr("x", function(d) { return x_oe(d.resp_age) })
          .attr("y", function(d) { return y_oe(d.cont_age) })
          .attr("width", x_oe.bandwidth() )
          .attr("height", y_oe.bandwidth() )
          .style("fill", function(d) { return colors_oe(d.count)} )
          .style("stroke-width", 4)
          .style("stroke", "none")
          .style("opacity", 0.8)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave);
})
