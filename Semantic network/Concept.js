document.write('<script src="Relation.js"></script>');

function Concept(name){
	this.name = name;
	this.relations = [];	
  
	this.addRelation = function(relationName, concept){
		this.relations.push(new Relation(relationName, concept, this));
	}
	
	this.equals = function(concept){
		return this.name == concept.name;
	}
}
