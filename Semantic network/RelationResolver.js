document.write('<script src="Concept.js"></script>');

// Esta funci�n verifica si hay una relaci�n de herencia entre dos conceptos.
// Es decir, si dado un concepto y un nombre de relaci�n, se puede llegar infiriendo por herencia
// al otro concepto.
function hasRelation(startConcept, relationName, endConcept){
	for(var i=0; i < startConcept.relations.length; i++){
		var relation = startConcept.relations[i];
		if(relation.name == relationName){
			if(relation.apply(endConcept)){
				return true;  // Encontramos una relaci�n al concepto buscado, terminamos
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