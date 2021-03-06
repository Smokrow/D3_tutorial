/*
*    donutChart.js
*    Source: Section 10, Lecture 5
*    Mastering Data Visualization with D3.js
*    FreedomCorp Dashboard
*/

class DonutChart
{
  constructor (_parentElement, _variable)
  {
  this.parentElement = _parentElement;
  this.variable = _variable;
  this.initVis();
  }
  initVis()
  {
    var vis = this;


    vis.margin = { left:0, right:0, top:40, bottom:0 };
    vis.width = 250 - vis.margin.left - vis.margin.right;
    vis.height = 250 - vis.margin.top - vis.margin.bottom;
    vis.radius = Math.min(vis.width, vis.height) / 2;


    vis.pie = d3.pie()
        .padAngle(0.03)
        .value(function(d) { return d.value; })
        .sort(null);

    vis.arc = d3.arc()
        .innerRadius(vis.radius - 60)
        .outerRadius(vis.radius - 30);

    vis.svg = d3.select(vis.parentElement)
        .append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom);
    vis.g = vis.svg.append("g")
        .attr("transform", "translate(" + (vis.margin.left + (vis.width / 2)) +
            ", " + (vis.margin.top + (vis.height / 2)) + ")");

    vis.g.append("text")
        .attr("y", -vis.height/2)
        .attr("x", -vis.width/2)
        .attr("font-size", "15px")
        .attr("text-anchor", "start")
        .text(vis.variable == "market_cap" ?
            "Market Capitalization" : "Company Size");
      vis.myData=["small","medium","large"]
      vis.color= d3.scaleOrdinal()
          .domain(vis.myData)
          .range(d3.schemeCategory10);
    var legend=vis.svg.append("g").attr("id","label").attr("transform","translate(170,75)")


    legend.append("rect").attr("fill","white").attr("width", 70).attr("height", 115 ).attr("stroke","black");
    vis.myData.forEach((d,i)=>{
      var g=legend.append("g").attr("transform","translate(5,"+(10+i*40)+")")
      g.append("rect").attr("width", 10).attr("height", 10 ).attr("fill",vis.color(d));
      g.append("text").text(d).attr("transform","translate(12,10)")
    })
  }

  wrangleData(data)
  {
    var vis = this;
    vis.data=data.reduce((acc,i)=>
      {
        acc[i.company_size]+=1
        return acc
      }, {"small":0,"medium":0,"large":0});
    vis.data_in=[{"label":"small","value":vis.data["small"]},
              {"label":"medium","value":vis.data["medium"]},
              {"label":"large","value":vis.data["large"]}];
    vis.updateVis();

  }
  updateVis()
  {

    var vis = this;

    vis.path = vis.g.selectAll("path");
    vis.data0 = vis.path.data();

    vis.data1 = vis.pie(vis.data_in);

    // JOIN elements with new data.
    vis.path = vis.path.data(vis.data1);



    var g = vis.svg.selectAll(".arc")
      .data(vis.data1)
    .enter().append("g")
      .attr("class", "arc");



  g.append("path")
      .attr("d", vis.arc)
      .style("fill", function(d) { return vis.color(d.data.label); })
      .attr("data-legend",function(d) { return d.data.label})
      .attr("transform", "translate(" + (vis.margin.left- 50 + (vis.width / 2)) +
          ", " + (vis.margin.top + (vis.height / 2)) + ")");



/*
  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data; });
*/
    // EXIT old elements from the screen.
    vis.path.exit()
        .datum(function(d, i) { return findNeighborArc(i, vis.data1, vis.data0, key) || d; })
        .transition()
        .duration(750)
        .attrTween("d", arcTween)
        .remove();

    // UPDATE elements still on the screen.
    vis.path.transition()
        .duration(750)
        .attrTween("d", arcTween)
        .attr("fill-opacity", function(d) {
            return (d.data.coin == vis.activeCoin) ? 1 : 0.3;
        })

    // ENTER new elements in the array.
    vis.path.enter()
        .append("path")
        .each(function(d, i) { this._current = findNeighborArc(i, vis.data0, vis.data1, key) || d; })
        .attr("fill","red")

    function key(d){
        return d.data.coin;
    }

    function findNeighborArc(i, data0, data1, key) {
        var d;
        return (d = findPreceding(i, vis.data0, vis.data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
            : (d = findFollowing(i, vis.data0, vis.data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
            : null;
    }

    // Find the element in data0 that joins the highest preceding element in data1.
    function findPreceding(i, data0, data1, key) {
        var m = vis.data0.length;
        while (--i >= 0) {
            var k = key(vis.data1[i]);
            for (var j = 0; j < m; ++j) {
                if (key(vis.data0[j]) === k) return vis.data0[j];
            }
        }
    }

    // Find the element in data0 that joins the lowest following element in data1.
    function findFollowing(i, data0, data1, key) {
        var n = vis.data1.length, m = vis.data0.length;
        while (++i < n) {
            var k = key(vis.data1[i]);
            for (var j = 0; j < m; ++j) {
                if (key(vis.data0[j]) === k) return vis.data0[j];
            }
        }
    }

    function arcTween(d) {
        var i = d3.interpolate(this._current, d);
        this._current = i(1)
        return function(t) { return vis.arc(i(t)); };
    }

  }

}
