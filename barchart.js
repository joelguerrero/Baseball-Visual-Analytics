var chartType = 0; // 0 = BarChart; 1 = PieChart; To toggle between charts with onClick event

var margin = {top: 20, right: 30, bottom: 30, left: 40};
var w = 600; // width of SVG
var h = 600; // height of SVG
var barPadding = 10; // padding between bins
     
w = w - margin.left - margin.right;
h = h - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, w], 0);

var y = d3.scale.linear()
    .range([h, 0]);

var noOfBins = 7; //number of histogram bins
var ftr1 = [];
var ftr2 = [];
var ftr3 = [];
var ftr4 = [];

//Parse CSV file.
d3.csv("Icecream.csv", function(csvdata) {
    csvdata.map(function(d) {
        ftr1.push(d.income);
        ftr2.push(d.cons);
        ftr3.push(d.price);
        ftr4.push(d.temp);
    })
    
    refillDataHistogram(ftr1, noOfBins);
});

function refillDataHistogram(ftr, noOfBins){
    // calculate range of each bin
    var binWidth = (d3.max(ftr) - d3.min(ftr))/(noOfBins-1);
    
    // create an empty feature frequency array
    ftrFreq = Array.apply(null, Array(noOfBins)).map(Number.prototype.valueOf,0);

    // populate ftrFreq array
    ftr.forEach(function(d){
        ftrFreq[Math.floor((d - d3.min(ftr))/binWidth)]++;
    })

    if(chartType == 0){
        document.getElementById("bar").innerHTML = '';
        createHistogram(ftrFreq);
    }else{
        document.getElementById("pie").innerHTML = '';
        createPieChart(ftrFreq);
    }
}

function createHistogram(histData, bin){

    var scaleHeight = (0.9*h/d3.max(histData));

    //Create SVG element. This is my bar chart/histogram element
    var svg = d3.select("#bar")
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // x axis of bar chart
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // y axis of bar chart
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // TODO ---------------------------------------------------------------------------------
    // svg.append("svg")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + h + ")")
    //     .call(xAxis);

    // svg.append("svg")
    //     .attr("class", "y axis")
    //     .call(yAxis)

    //create histogram bins and its events (mouse-over, mouse-out and click)
    svg.selectAll(".bar")
        .data(histData)
    .enter().append("rect")
        .attr("class", "bar")
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
            .attr("height",parseInt(d3.select(this).attr("height")) + 15)

            // on mouse-over display the value of the bin on top of the bin
            d3.selectAll("text").each(function (d, currI) {
                if (currI === i) {
                    d3.select(this).style("visibility", "visible");   
                }
            })

        })
        
        .on("mouseout", function(d,i) {
            // on mouse-out make the bin back to normal size
            d3.select(this)   
            // .transition().duration(500)
            .attr("x",i * (w / histData.length))         
            .attr("y",parseInt(d3.select(this).attr("y")) + 15)            
            .attr("width", w / histData.length - barPadding)
            .attr("height",parseInt(d3.select(this).attr("height")) - 15)  

            // on mouse-out remove the value of the bin on top of the bin
            d3.selectAll("text").each(function (d, currI) {
                if (currI === i) {
                    d3.select(this).style("visibility", "hidden");   
                }
            })   
        })

        .on("click", function() {
            document.getElementById("bar").innerHTML = '';
            createPieChart(histData);      
            chartType = 1;      
        })


    svg.selectAll("text")
        .data(histData)
    .enter().append("text")
        .attr("class", "bar")
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return i * (w / histData.length) + (w / histData.length - barPadding) / 2;
        })
        .attr("y", function(d) {
            return h - (d * scaleHeight) - 20;
        })
        .text(function(d) { 
            return d; 
        })
        .style("visibility", "hidden");
}