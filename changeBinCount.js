function changeBinCount(){
	d3.select("#binWidthUpdate").on("mousedown", function() {
  	
	  	var div = d3.select(this)
		    .classed("active", true);

		// Get current x position on button.
		var xPos = d3.mouse(div.node())[0];
		var w = d3.select(window)
			.on("mousemove", mousemove)
			.on("mouseup", function(){
				div.classed("active", false);
		    	w.on("mousemove", null).on("mouseup", null);
		 	});

		// On mouse move increase or decrease the number of bins.    	
		function mousemove() {
		  	if(d3.mouse(div.node())[0] + 20 < xPos && noOfBins > 4){
		  		noOfBins -= 1;
		  		refillDataHistogram(currFtr, noOfBins);
		  		xPos = d3.mouse(div.node())[0];
		  	}
		    else if(d3.mouse(div.node())[0] - 20 > xPos && noOfBins < 25){
		  		noOfBins += 1;
		  		refillDataHistogram(currFtr, noOfBins);
		  		xPos = d3.mouse(div.node())[0];
		  	}
		}
	}); 
}