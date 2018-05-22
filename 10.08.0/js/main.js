/*
*    main.js
*    Mastering Data Visualization with D3.js
*    FreedomCorp Dashboard
*/



var stackChart_conf={"width":800,
                     "height":400};
console.log("TimelineInit")
var timeline=new Timeline("#timeline")
var Stacked=new StackedChart("#stacked-area",stackChart_conf);
console.log("Hello")

d3.json("data/calls.json").then(function(data){
    console.log(data)
    console.log("Balbla")
    function onchange()
    {
      var dataPointer=$("#var-select").val()
      Stacked.wrangleData(data,dataPointer)
      Stacked.update_vis()
      console.log("Here comes the timeline")
      console.log(data)
      timeline.wrangleData(data)
      timeline.updateVis()
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
