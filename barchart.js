var x = d3.scale.ordinal()
    .rangeRoundBands([0, w], 0.5);

var y = d3.scale.linear()
    .range([h, 0]);

// x axis of bar chart
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// y axis of bar chart
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

function createHistogram(histData, binValues){

    var scaleHeight = (0.9*h/d3.max(histData));

    //Create SVG element. This is my bar chart/histogram element
    var svg = d3.select("#bar")
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //Set background color of svg container or chart.
    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "aliceblue");

    //colors for bar chart.
    var color = d3.scale.category20();

    //Append y axis to chart.
    svg.append("g")
        .attr("class", "y axis")
        .append("text") 
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    y.domain([0, d3.max(histData, function(d) {
        return d;
    })]);

    // x.domain(binValues)
    //     .rangePoints([0, w]);

    svg.select(".y.axis").call(yAxis);
    // svg.select(".x.axis").call(xAxis);



    // var labels = svg
    //     .selectAll(".bartext")
    //   .data(histData, function(d, i) {
    //       return d;
    //     });

    // labels
    //   .enter()
    //   .append("text")
    //   .attr("class", "bartext")
    //   .attr("text-anchor", "middle")
    //   .attr("fill", "black");
      
    // labels
    //   .attr("x", function(d, i) {
    //     return x(d) + 7.5;
    //   })
    //   .attr("y", function(d, i) {
    //     return h + 20;
    //   })
    //   .text(function(d, i) {
    //     return d;
    //   });

    //Initialize bar tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
    
    svg.call(tip);

    //create histogram bins and its events (mouse-over, mouse-out and click)
    svg.selectAll(".bar")
        .data(histData)
    .enter().append("rect")
        .attr("class", "bar")
        .attr('fill', function(d,i){
            return color(i);
        })
        .attr("x", function(d, i) {
            return i * (w / histData.length);
        })
        .attr("y", function(d) {
            return h - (d * scaleHeight);
        })
        .attr("width", w / histData.length - barPadding)
        .attr("height", function(d) {
            return d * scaleHeight;
        })
        
        .on("mouseover", function(d,i) {
            // on mouse-over make the bin wider and higher to focus on it
            d3.select(this)
            // .transition().duration(500)
            .attr("x",i * (w / histData.length) - 5)
            .attr("y", parseInt(d3.select(this).attr("y")) - 15)         
            .attr("width",w / histData.length - barPadding + 10)
            .attr("height",parseInt(d3.select(this).attr("height")) + 15);
            
            tip.html( "<strong> <span style='color:red'>" + d + "</span></strong>");
            tip.show();

            // on mouse-over display the value of the bin on top of the bin
            // d3.selectAll("text").each(function (d, currI) {
            //     if (currI === i) {
            //         d3.select(this).style("visibility", "visible");   
            //     }
            // })

        })
        
        .on("mouseout", function(d,i) {
            // on mouse-out make the bin back to normal size
            d3.select(this)   
            // .transition().duration(500)
            .attr("x",i * (w / histData.length))         
            .attr("y",parseInt(d3.select(this).attr("y")) + 15)            
            .attr("width", w / histData.length - barPadding)
            .attr("height",parseInt(d3.select(this).attr("height")) - 15)  

            tip.hide();

            // on mouse-out remove the value of the bin on top of the bin
            // d3.selectAll("text").each(function (d, currI) {
            //     if (currI === i) {
            //         d3.select(this).style("visibility", "hidden");   
            //     }
            // })   
        })

        .on("click", function() {
            document.getElementById("bar").innerHTML = '';
            tip.hide();
            createPieChart(histData);      
            chartType = 1;      
        })

    // svg.selectAll("text")
    //     .data(histData)
    // .enter().append("text")
    //     .attr("class", "bar")
    //     .attr("text-anchor", "middle")
    //     .attr("x", function(d, i) {
    //         return i * (w / histData.length) + (w / histData.length - barPadding) / 2;
    //     })
    //     .attr("y", function(d) {
    //         return h - (d * scaleHeight) - 20;
    //     })
    //     .text(function(d) { 
    //         return d; 
    //     })
    //     .style("visibility", "hidden");

}