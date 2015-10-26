

FrameSlot = function (name){

  this.name = name;
  this.value = "";  
  this.facets = {};
  
  this.setValue = function(slotValue){
	this.value = slotValue;
  }  
  this.getValue = function(){
	return this.value;
  }
  
  // A un facet se lo declara primero y posteriormente se le puede asignar un valor
  this.declareFacet = function(facetName){
    if(!this.facets.hasOwnProperty(facetName)){
		this.facets[facetName] = "";
	}
  }
  this.setFacetValue = function(facetName, facetValue){
	if(this.facets.hasOwnProperty(facetName)){
		this.facets[facetName] = facetValue;
		return true;
	}
	return false;
  }
  this.getFacetValue = function(facetName){
	if(this.facets.hasOwnProperty(facetName)){
		return this.facets[facetName];
	}
	return null;
  }
};