var margin = {top:50, left:60, bottom:30, right:30},
    width = 1000 - margin.left - margin.right,
    height = 620 - margin.left - margin.right;


var svg = d3.select("div#forceDirectedGraph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-150))
    .force("center", d3.forceCenter(width / 2, height / 2))
    // .alphaDecay(0.00228);
    .alphaDecay(0);

d3.json("data/skytest.json").then(function(graph) {

  console.log(graph);

  var link = svg.append("g")
      .attr("class", "edges")
    .selectAll("line")
    .data(graph.edges)
    .enter().append("line")
      .attr("stroke-width", function(d) { return (d.count**0.5)*0.1; });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", function(d) {return (d.rows*0.2)**0.5;})
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.id; });

  var nodelabel = svg.append("g")
        .attr("class", "nodelabels")
      .selectAll("text")
      .data(graph.nodes)
      .enter().append("text")
      .text(function (d) {return d.id;})
      .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
        
  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.edges)
      .strength(function(d) {return (d.count**0.5)*0.001;});

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    nodelabel
        .attr("x", function(d) {return d.x})
        .attr("y", function(d) {return d.y});
  }
});

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
