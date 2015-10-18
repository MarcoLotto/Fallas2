
function Relation(name, concept1, concept2){
  this.name = name;
  this.concept1 = concept1;
  this.concept2 = concept2;
  
  this.apply = function(concept){
	return (this.concept1.equals(concept) || this.concept2.equals(concept));
  }
  
  this.getDestinationConcept = function(originConcept){
	if(this.concept1.equals(originConcept)){
		return this.concept2;
	}
	return this.concept1;
  }
}