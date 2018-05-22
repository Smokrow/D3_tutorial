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
  this.margin = {top: 40, right: 100, bottom: 20, left: 80},
  this.width = this.svg.attr("width") - this.margin.left - this.margin.right,
  this.height = this.svg.attr("height") - this.margin.top - this.margin.bottom;


  this.x_scale = d3.scaleTime().range([0, this.width]),
  this.y_scale = d3.scaleLinear().range([this.height, 0]),
  this.z_scale = d3.scaleOrdinal(d3.schemeCategory10);
  console.log("XXX")
  console.log(this.x)
  this.g = this.svg.append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  this.xaxis=this.g.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + this.height + ")")
  this.yaxis=this.g.append("g")
              .attr("class", "axis axis--y")





  }


  wrangleData(data,key)
  {
    //var key = $("#var_select").val()

    var vis= this;
    var nest=d3.nest()
    var nested=nest.key(d => d.date).entries(data)
    vis.wrangled=[]
    nested.forEach(function(d){
      var date=d.key

      //console.log(typeof date)
      var value= d.values.reduce(function(acc,i){
        acc[i.team]= acc[i.team]+i[key]
        return acc
      },
        {"date":date,"northeast":0,"south":0,"west":0,"midwest":0}
      )

      vis.wrangled.push(value)
    });

  }
  update_vis()
  {
    this.parseDate = d3.timeParse("%d/%m/%Y");

    var vis= this
    var stack=d3.stack()
    .keys(["northeast","south","west","midwest"])

    vis.x_scale.domain(d3.extent(vis.wrangled, d => vis.parseDate(d.date)));
    vis.y_scale.domain([0,d3.max(vis.wrangled, d=> (d.northeast+d.south+d.west+d.midwest))])
    vis.z_scale.domain(["northeast","south","west","midwest"]);
    console.log(stack(vis.wrangled))
    var layer = this.g.selectAll(".layer")
      .data(stack(vis.wrangled),d=> d.date);

    layer.exit().remove()

    var area = d3.area().x(d=>vis.x_scale(vis.parseDate(d.data.date)))
            .y0(function(d) {
              //console.log(d)
              return vis.y_scale(d[0]); })
            .y1(function(d) { return vis.y_scale(d[1]); });

    layer.append("path")
    .attr("class", "area").attr("fill",d=> this.z_scale(d.key))
    .attr("d", area);

    layer.enter().append("g")
        .attr("class", "layer")
        .append("path")
        .attr("class", "area")
        .attr("fill",d=> this.z_scale(d.key))
        .attr("d", area);

    this.xaxis.call(d3.axisBottom(this.x_scale));
    this.yaxis.call(d3.axisLeft(this.y_scale).ticks(10));

  }}
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
