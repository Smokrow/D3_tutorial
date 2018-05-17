/*
*    main.js
*    Mastering Data Visualization with D3.js
*    FreedomCorp Dashboard
*/



var stackChart_conf={"width":400,
                     "height":400}

var Stacked=new StackedChart("#stacked-area",stackChart_conf);
console.log("Hello")
d3.json("data/calls.json").then(function(data){
    console.log(data)
    Stacked.wrangleData(data,"call_revenue")
})
