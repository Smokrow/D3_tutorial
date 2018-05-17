/*
*    stackedAreaChart.js
*    Source: https://bl.ocks.org/mbostock/3885211
*    Mastering Data Visualization with D3.js
*    FreedomCorp Dashboard
*/


class StackedChart
{
  constructor (_parentElement, _variable)
  {
  this.parentElement = _parentElement;
  this.variable = _variable;
  this.init();
  console.log("Help")
  }

  init()
  {
  this.svg =d3.select(this.parentElement).append("svg")
  this.svg.attr("width",this.variable.width).attr("height",this.variable.height)
  this.margin = {top: 20, right: 20, bottom: 30, left: 50},
  this.width = this.svg.attr("width") - this.margin.left - this.margin.right,
  this.height = this.svg.attr("height") - this.margin.top - this.margin.bottom;

  this.parseDate = d3.timeParse("%Y %b %d");

  this.x = d3.scaleTime().range([0, this.width]),
  this.y = d3.scaleLinear().range([this.height, 0]),
  this.z = d3.scaleOrdinal(d3.schemeCategory10);

  this.area = d3.area()
      .x(function(d, i) { return x(d.data.date); })
      .y0(function(d) { return y(d[0]); })
      .y1(function(d) { return y(d[1]); });

  this.g = this.svg.append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  }
  wrangleData(data,key)
  {
    //var key = $("#var_select").val()
    console.log(key)
    console.log(data)
    var nest=d3.nest()
    console.log("Buya")
    var nested=nest
      .key(function(d){return d.team})
      .key(function(d){return d.date})
      .rollup(function(d){return d3.sum(d,function(g){return g[key]})})
      .entries(data)
      ;

    console.log(nested)

    var stack=d3.stack()
    .keys(["north","south","east","west"])
    .values(function(d){return d.})
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);
    console.log(stack(nested))
    console.log("Hey")
    this.x.domain(d3.extent(data, function(d) { return d.date; }));
    this.z.domain(["north","south","east","west"]);


    var layer = this.g.selectAll(".layer")
      .data(data)
      .enter().append("g")
        .attr("class", "layer");

    layer.append("path")
        .attr("class", "area")
        .style("fill", function(d) { return "this.z(d.team);" })
        .attr("d", this.area);

    layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
      .append("text")
        .attr("x", width - 6)
        //.attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
        .attr("dy", ".35em")
        .style("font", "10px sans-serif")
        .style("text-anchor", "end")
        .text(function(d) { return d.key; });

    this.g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    this.g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"));

  }
}
/*
StackedChart.prototype.wrangleData = function(){
  var this=this;
}

StackedChart.prototype.updateVis = function(){
  var vis=this;
}*/
/*

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom;

var parseDate = d3.timeParse("%Y %b %d");

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var stack = d3.stack();

var area = d3.area()
    .x(function(d, i) { return x(d.data.date); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type).then(function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  x.domain(d3.extent(data, function(d) { return d.date; }));
  z.domain(keys);
  stack.keys(keys);

  var layer = g.selectAll(".layer")
    .data(stack(data))
    .enter().append("g")
      .attr("class", "layer");

  layer.append("path")
      .attr("class", "area")
      .style("fill", function(d) { return z(d.key); })
      .attr("d", area);

  layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
    .append("text")
      .attr("x", width - 6)
      .attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
      .attr("dy", ".35em")
      .style("font", "10px sans-serif")
      .style("text-anchor", "end")
      .text(function(d) { return d.key; });

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"));
});

function type(d, i, columns) {
  d.date = parseDate(d.date);
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]] / 100;
  return d;
}*/
