function createForceChart(histData) {

	var nodes = [];
	var links = [];
	
	for (var i = 0; i < histData.length; i++) {
		nodes.push({
			name : histData[i],
			value : histData[i],
			target : [ 0 ]
		})
	}	

	for (var i = 0; i < nodes.length; i++) {
		for (var j = 0; j < nodes[i].target.length; j++) {
			links.push({
				source : nodes[i],
				target : nodes[nodes[i].target[j]]
			})
		}
	}

	var svg = d3.select('#force')
    	.append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //Set background color of svg container or chart.
    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "aliceblue");

    var color = d3.scale.category20();

    var force = d3.layout.force()
    	.size([ w, h ])
    	.nodes(nodes)
    	.links([])
		.linkStrength(0.3).friction(0.9).linkDistance(100).charge(-120)
		.gravity(0.1).theta(0.8).alpha(0.1);

    var link = svg.selectAll('.link')
	    .data(links)
	    .enter().append('line')
	    .attr('class', 'link')
	    .style('stroke', 'black')
	    .style("stroke-width", function(d) {
			return Math.sqrt(Math.sqrt(d.source.value));
		});

    var gnodes = svg.selectAll('.node')
	    .data(nodes)
	    .enter().append('g')
	    .classed('gnode', true);

	var node = gnodes.append('circle')
		.attr("class", "node")
	    .attr("r", 20)
        .attr("opacity", 0.5)
        .style("fill", function(d,i) { return color(i); })
        .call(force.drag);

    var labels = gnodes.append("text")
    	.text(function(d) { 
    		return d.name; 
    	});

    force.on('tick', function() {
	    gnodes.attr('transform', function(d) {
			return 'translate(' + d.x + ', ' + d.y + ')';
		})
		link.attr('x1', function(d) { return d.source.x; })
	        .attr('y1', function(d) { return d.source.y; })
	        .attr('x2', function(d) { return d.target.x; })
	        .attr('y2', function(d) { return d.target.y; });
	});

	force.start();

	svg.on("click", function() {
        document.getElementById("force").innerHTML = '';
        createHistogram(histData);      
        chartType = 0;      
    })
}