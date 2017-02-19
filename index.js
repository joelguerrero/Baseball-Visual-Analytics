var currFtr = []; // current feature vector of chart

//navigation function
function htFn() {
	xAttr = 'Heights of the Baseball players';
	document.getElementById("xLabel").innerHTML = xAttr;
    currFtr = ftr1;
    refillDataHistogram(ftr1, noOfBins);    
}
function wtFn() {
	xAttr = 'Weights of the Baseball players';
    currFtr = ftr2;
    refillDataHistogram(ftr2, noOfBins);
    document.getElementById("xLabel").innerHTML = xAttr;    
}
function avgFn() {
	xAttr = 'Average of the Baseball players';
    currFtr = ftr3;
    refillDataHistogram(ftr3, noOfBins);
    document.getElementById("xLabel").innerHTML = xAttr;    
}
function hrFn() {
	xAttr = 'Heart Rate of the Baseball players';
    currFtr = ftr4;
    refillDataHistogram(ftr4, noOfBins);
    document.getElementById("xLabel").innerHTML = xAttr;
}

var margin = {top: 20, right: 40, bottom: 30, left: 180};
var w = 1200; // width of SVG
var h = 500; // height of SVG
var barPadding = 10; // padding between bins
     
w = w - margin.left - margin.right;
h = h - margin.top - margin.bottom;

var noOfBins = 15; //number of histogram bins
var ftr1 = [];
var ftr2 = [];
var ftr3 = [];
var ftr4 = [];

// 0 = BarChart; 1 = PieChart; 2 = ForceChart; To toggle between charts with onClick event
var chartType = 0; 

//Parse CSV file.
d3.csv("baseball_data.csv", function(csvdata) {
    csvdata.map(function(d) {
        ftr1.push(+d.height);
        ftr2.push(+d.weight);
        ftr3.push(+d.avg);
        ftr4.push(+d.HR);
    })
    
    currFtr = ftr1;
    refillDataHistogram(ftr1, noOfBins);
});

function refillDataHistogram(ftr, noOfBins){
    // calculate range of each bin
    var binWidth = (d3.max(ftr) - d3.min(ftr))/(noOfBins-1);
    
    // create an empty feature frequency array
    ftrFreq = Array.apply(null, Array(noOfBins)).map(Number.prototype.valueOf,0);
    binValues = [];

    // populate ftrFreq array
    ftr.forEach(function(d){
        ftrFreq[Math.floor((d - d3.min(ftr))/binWidth)]++;
    })

    //populate binValues
    var min = d3.min(ftr);
    for(i=0; i<noOfBins; i++){
    	var end = (+min + +binWidth).toFixed(1);
    	binValues.push(min + "-" + end);
    	min = end;
    }

    if(chartType == 0){
        document.getElementById("bar").innerHTML = '';
        createHistogram(ftrFreq, binValues);
    }else if(chartType == 1){
        document.getElementById("pie").innerHTML = '';
        createPieChart(ftrFreq);
    }else {
        document.getElementById("force").innerHTML = '';
        createForceChart(ftrFreq);
    }

    changeBinCount();
}