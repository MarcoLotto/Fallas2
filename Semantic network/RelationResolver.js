document.write('<script src="Concept.js"></script>');

// Esta función verifica si hay una relación de herencia entre dos conceptos.
// Es decir, si dado un concepto y un nombre de relación, se puede llegar infiriendo por herencia
// al otro concepto.
function hasRelation(startConcept, relationName, endConcept){
	for(var i=0; i < startConcept.relations.length; i++){
		var relation = startConcept.relations[i];
		if(relation.name == relationName){
			if(relation.apply(endConcept)){
				return true;  // Encontramos una relación al concepto buscado, terminamos
			}
			
			// Verificamos si por esta rama podemos llegar al concepto buscado
			var middleConcept = relation.getDestinationConcept(startConcept);
			if(hasRelation(middleConcept, relationName, endConcept)){
				return true;
			}
		}
	}
	return false;
}