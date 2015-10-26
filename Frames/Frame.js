document.write('<script src="FrameSlot.js"></script>');

Frame = function (name){

  this.name = name;
  this.slots = [];
  this.facetNames = [];
  
  this.addSlot = function(frameSlot){
	this.slots.push( frameSlot );
	for(var i=0; i < this.facetNames.length; i++){
		frameSlot.declareFacet(this.facetNames[i]);
	}
  }
  
  this.getSlotByName = function(slotName){
	for(var i=0; i < this.slots.length; i++){
		var slot = this.slots[i];
		if(slot.name == slotName){
			return slot;
		}
	}
	return null;
  }
  
  this.getSlots = function(){
	return this.slots;
  }
  
  // Permitimos declarar opcionalmente facets al frame
  this.declareFacet = function(facetName){
	for(var i=0; i < this.slots.length; i++){
		this.slots[i].declareFacet(facetName);
	}
	this.facetNames.push(facetName);
  }
};
