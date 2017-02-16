function pieChartUtil(array){
  var sum = 0;
  for (var i=array.length; i--;) {
    sum+=array[i];
  }
  console.log(sum)
  return 360/sum;
}

function createPieChart(histData){

    var radius = Math.min(w, h) / 2;
	var color = d3.scale.ordinal()
    	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    // var mulRatio = pieChartUtil(histData);

    var arc = d3.svg.arc()
		.outerRadius(radius - 10)
    	.innerRadius(0);

    var arcBig = d3.svg.arc()
        .outerRadius(radius + 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
    	.outerRadius(radius - 40)
    	.innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d; });

    var svg = d3.select("#pie")
        .append("svg")
            .attr("width", w+60)
            .attr("height", h+60)
        .append("g")
            .attr("transform", "translate(" + 0.55 * w + "," + 0.55 * h + ")");

    var renderArcs = svg.selectAll(".arc")
        .data(pie(histData))
    .enter().append("g")
        .attr("class", "arc");

    renderArcs.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { 
            return color(i); 
        })

        .on("mouseover", function(d,i) {
            d3.select(this)
                .transition().duration(1000)
                .attr("d", arcBig)
            // .attr("stroke", "black")
            d3.selectAll("text").each(function (d, currI) {
                if (currI === i) {
                    d3.select(this).style("visibility", "visible");   
                }
            })         
        })

        .on("mouseout", function(d,i) {
            d3.select(this)
                .transition().duration(1000)
                .attr("d",arc)
            // .attr("stroke", "none");    
            
            d3.selectAll("text").each(function (d, currI) {
                if (currI === i) {
                    d3.select(this).style("visibility", "hidden");   
                }     
            })
    })

    renderArcs.on("click", function() {
        document.getElementById("pie").innerHTML = '';
        createHistogram(histData);      
        chartType = 0;      
    })

    renderArcs.append("text")
        .attr("transform", function(d) { 
            return "translate(" + labelArc.centroid(d) + ")"; 
        })
        .attr("dy", ".35em")
        .text(function(d) { 
            return d.value; 
        })
        .style("visibility", "hidden");
}