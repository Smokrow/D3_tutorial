/*
*    main.js
*    Mastering Data Visualization with D3.js
*    CoinStats
*/

var margin = { left:80, right:100, top:50, bottom:100 },
    height = 500 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left +
        ", " + margin.top + ")");

// Time parser for x-scale
var parseTime = d3.timeParse("%d/%m/%Y");
var formatTime = d3.timeFormat("%m-%d-%y")
// For tooltip
var bisectDate = d3.bisector(function(d) { return d.year; }).left;

// Scales
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Axis generators

var yAxisCall = d3.axisLeft()
    .ticks(6)
    .tickFormat(function(d) { return parseInt(d / 1000) + "k"; });

// Axis groups
var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");
var yAxis = g.append("g")
    .attr("class", "y axis")

// Y-Axis label
yAxis.append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .attr("fill", "#5D6971")
    .text("Population");

// Line path generator
var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });


var line1 = g.append("path")


console.log("Hello")
d3.json("data/coins.json").then(function(data) {
    // Data cleaning


    var LineData=[];



    var update = function()
    {
      var Coinname = $("#coin-select").val();
      var Coinset=$("#var-select").val();
      //console.log(Coinname);
      //console.log(Coinset);
      //console.log(data[Coinname]);

      var LineData=[];
      counter=0;
      countData=[]
      console.log(d3.extent(data[Coinname], function(d) {return d.date;}));

      x.domain(d3.extent(data[Coinname], function(d) {return parseTime(d.date);}));
      var dates = $( "#date-slider" ).slider("values");
      console.log(dates[0])
      var lower=x.invert(dates[0])
      var upper=x.invert(dates[1])

      d3.select("#dateLabel1").text(formatTime(lower)+" - "+formatTime(upper))

      console.log(lower)


      data[Coinname].forEach(function(d){
        //console.log(d[Coinset])
        if((d[Coinset]!=null))
        {

          //console.log(dates)

          if((parseTime(d.date)>lower)&&(parseTime(d.date)<upper)){
            LineData.push({"date":parseTime(d["date"]),"value":+d[Coinset]});
          }
          //LineData.push({"date":+counter,"value":+d[Coinset]});
          //console.log(parseTime(d.date))
          counter+=1;
          countData.push(counter)
        }
      });
      console.log(d3.extent(LineData, function(d) {return d.date;}))
      console.log(LineData)
      x.domain(d3.extent(LineData, function(d) {return d.date;}));




          // Set scale domains

      y.domain([d3.min(LineData, function(d) { return d.value; }) / 1.005,
      d3.max(LineData, function(d) { return d.value; }) * 1.005]);

          // Generate axes once scales have been set

      var xAxisCall = d3.axisBottom()
      xAxis.call(xAxisCall.scale(x))
      yAxis.call(yAxisCall.scale(y))

      line1.attr("class", "line")
          .attr("fill", "none")
          .attr("stroke", "grey")
          .attr("stroke-with", "3px")
          .transition(1)
          .attr("d", line(LineData));
      //console.log(line(LineData));



    /*  function mousemove() {
          var x0 = x.invert(d3.mouse(this)[0]),
              i = bisectDate(data, x0, 1),
              d0 = data[i - 1],
              d1 = data[i],
              d = x0 - d0.year > d1.year - x0 ? d1 : d0;
          focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
          focus.select("text").text(d.value);
          focus.select(".x-hover-line").attr("y2", height - y(d.value));
          focus.select(".y-hover-line").attr("x2", -x(d.year));
      }*/


    }
    console.log("Ready to update");

    $( "#date-slider" ).slider({
        range: true,
        min:  0,
        max: width,
        values: [0,width],
        slide: update}
      );
    $("#coin-select").on("change",update);
    $("#var-select").on("change",update);
    update();
    // Add line to chart


    /******************************** Tooltip Code ********************************/
/*
    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5);

    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");

    g.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    */


    /******************************** Tooltip Code ********************************/

});
