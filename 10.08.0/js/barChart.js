/*
*    barChart.js
*    Source: https://bl.ocks.org/mbostock/3885304
*    Mastering Data Visualization with D3.js
*    FreedomCorp Dashboard
*/


class barChart
{
  constructor (_parentElement,_variable)
  {
  this.parentElement = _parentElement;
  this.variable=_variable
  this.data_pointer=_variable.data

  this.initVis();
  }
  initVis()
  {

    this.margin = { left:50, right:0, top:40, bottom:30 };
    this.width = 300 - this.margin.left - this.margin.right;
    this.height = 250 - this.margin.top - this.margin.bottom;
    this.svg=d3.select(this.parentElement).append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom);

    this.g = this.svg.append("g")
    .attr("transform", "translate(" + this.margin.left +
        ", " + this.margin.top+")");
    this.xData=["electronics","furniture","appliances","materials"]

    this.x = d3.scaleBand().domain(this.xData).padding(0.3).range([this.width,0])
    this.y = d3.scaleLinear().range([this.height, 0]);

  }
  wrangleData(data)
  {
    if(this.data_pointer="units_sold")
    {
      this.data=data.reduce((acc,i)=>
        {
          acc[i.category]+=i.units_sold
          return acc
        }, {"electronics":0,"furniture":0,"appliances":0,"materials":  0});
      console.log(this.data)
    }
    this.updateVis()
  }
  updateVis()
  {
          var array= Object.values(this.data);
          console.log(this.data)
          this.y.domain([0,d3.max(array)]);

          this.g.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + this.height + ")")
              .call(d3.axisBottom(this.x));

          this.g.append("g")
              .attr("class", "axis axis--y")
              .call(d3.axisLeft(this.y))
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", -6)
              .attr("x",5)
              .attr("dy", "0.71em")
              .attr("text-anchor", "end")
              .text("Gey");
          var data=[]
          for (var key in this.data){
            data.push({"key":key,"data":this.data[key]});
          }
          console.log(data)
          console.log(this.y)

          this.g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", (d=>{console.log(d.key);
                return this.x(d.key)}))
              .attr("y", d=>this.y(d.data))
              .attr("width", this.x.bandwidth())
              .attr("height", d=>{console.log(this.y(d.data)); return this.height-this.y(d.data)});


  }
  funky_dunky()
  {



    }
  }
