
Relation = function (name, concept1, concept2){

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
};


Relation.asDependency = function (concept1, name, concept2) {
    concept1.addRelation(name, concept2);
  };

Relation.asRelation = function (concept1, name, concept2) {
    concept1.addRelation(name, concept2);
    concept2.addRelation(name, concept1);
  }


