/*
*    main.js
*    Mastering Data Visualization with D3.js
*    FreedomCorp Dashboard
*/



var stackChart_conf={"width":800,
                     "height":400};

var bar1_conf={"data":"units_sold"}

var timeline=new Timeline("#timeline")
var Stacked=new StackedChart("#stacked-area",stackChart_conf);
var pie1= new DonutChart("#company-size")
var bar1=new barChart("#units-sold",bar1_conf)

console.log("Hey")
d3.json("data/calls.json").then(function(data){
    console.log(data)
    function onchange()
    {
      var dataPointer=$("#var-select").val()
      Stacked.wrangleData(data,dataPointer)
      Stacked.update_vis()

      timeline.wrangleData(data)
      timeline.updateVis()

      pie1.wrangleData(data)

      bar1.wrangleData(data)
    }
    $("#var-select").on("change",onchange)


    data.forEach(function(d)
  {
    d.call_duration= +d.call_duration
    d.call_revenue= +d.call_revenue
    d.units_sold= +d.units_sold
  })
    onchange()

})
