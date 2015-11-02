document.write('<script src="d3.v3.min.js"></script>');

function createNodes(concepts){
	var nodes = [];
	for(var i=0; i < concepts.length; i++){
		nodes.push( { "name": concepts[i].name } );
	}
	return nodes;
}

function getNodeReference(nodes, nodeName){
	for(var i=0; i < nodes.length; i++){
		if(nodes[i].name == nodeName){
			return nodes[i];
		}
	}
	return null;
}

function createLinks(nodes, concepts){
	var links = [];
	for(var i=0; i < concepts.length; i++){
		var originConcept = concepts[i];
		var relations = originConcept.relations;		
		for(var j=0; j < relations.length; j++){
			var destinationConcept = relations[j].getDestinationConcept(originConcept);
			links.push( {"source": getNodeReference(nodes, originConcept.name), "target": getNodeReference(nodes, destinationConcept.name)} );
		}
	}
	return links;
}

function makeGraph(concepts){
	var nodes = createNodes(concepts);
	var links = createLinks(nodes, concepts);
	
	var w = 1024, h = 768;
	var circleWidth = 5;
	
	var vis = d3.select("body")
		.append("svg:svg")
		  .attr("class", "stage")
		  .attr("width", w)
		  .attr("height", h);

	var force = d3.layout.force()
		.nodes(nodes)
		.links([])
		.gravity(0.1)
		.charge(-1000)
		.size([w, h]);
		
	// Definimos la flecha de los links
	vis.append("svg:defs").selectAll("marker")
    .data(["end"])      
	.enter().append("svg:marker")  
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
	.append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

	 var link = vis.selectAll(".link")
			.data(links)
			.enter().append("line")
			  .attr("class", "link")
			  .attr("stroke", "#CCC")
			  .attr("fill", "none")
			  .attr("marker-end", "url(#end)");

	 var node = vis.selectAll("circle.node")
		  .data(nodes)
		  .enter().append("g")
		  .attr("class", "node")

		  //MOUSEOVER
		  .on("mouseover", function(d,i) {
			if (i>0) {
			  //CIRCLE
			  d3.select(this).selectAll("circle")
			  .transition()
			  .duration(250)
			  .style("cursor", "none")     
			  .attr("r", circleWidth+3)
			  .attr("fill", "blue");

			  //TEXT
			  d3.select(this).select("text")
			  .transition()
			  .style("cursor", "none")     
			  .duration(250)
			  .style("cursor", "none")     
			  .attr("font-size","1.5em")
			  .attr("x", 15 )
			  .attr("y", 5 );
			} else {
			  //CIRCLE
			  d3.select(this).selectAll("circle");

			  //TEXT
			  d3.select(this).select("text")
			  .style("cursor", "none")     
			}
		  })

		  //MOUSEOUT
		  .on("mouseout", function(d,i) {
			if (i>0) {
			  //CIRCLE
			  d3.select(this).selectAll("circle")
			  .transition()
			  .duration(250)
			  .attr("r", circleWidth);

			  //TEXT
			  d3.select(this).select("text")
			  .transition()
			  .duration(250)
			  .attr("font-size","1em")
			  .attr("x", 8 )
			  .attr("y", 4 );
			}
		  })

		  .call(force.drag);


		//CIRCLE
		node.append("svg:circle")
		  .attr("cx", function(d) { return d.x; })
		  .attr("cy", function(d) { return d.y; })
		  .attr("r", circleWidth)
		  .attr("fill", "blue" );

		//TEXT
		node.append("text")
		  .text(function(d, i) { return d.name; })
		.attr("x",    function(d, i) { return circleWidth + 5; })
		  .attr("y",            function(d, i) { if (i>0) { return circleWidth + 0 }    else { return 8 } })
		  .attr("font-family","Bree Serif")
		  .attr("fill", "black")
		  .attr("font-size", "1em")
		  .attr("text-anchor",  function(d, i) { if (i>0) { return  "beginning"; }      else { return "end" } })



	force.on("tick", function(e) {
	  node.attr("transform", function(d, i) {     
			return "translate(" + d.x + "," + d.y + ")"; 
		});
		
	   link.attr("x1", function(d)   { return d.source.x; })
		   .attr("y1", function(d)   { return d.source.y; })
		   .attr("x2", function(d)   { return d.target.x; })
		   .attr("y2", function(d)   { return d.target.y; })
	});

	force.start();
}
