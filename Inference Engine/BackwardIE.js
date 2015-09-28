document.write('<script src="ConceptBag.js"></script>');

function BackwardIE(conceptUniverse){
  this.universeConceptBag = conceptUniverse;

  // Verifica si puede inferir el concepto final en base a universo de conceptos y conceptos conocidos.
  // Completa los conceptos conocidos con la informacion  final
  this.getInference = function(knownConcepts, finalConcept){
    if(this.internalGetInference(knownConcepts, finalConcept)){
      if(!knownConcepts.hasConcept(finalConcept)){
        knownConcepts.add(finalConcept);
      }
      return true;
    }
    return false;
  }

  this.internalGetInference = function(knownConcepts, finalConcept){
    // Primero verificamos si finalConcept esta en la base de conocimeintos
    if(knownConcepts.hasConcept(finalConcept)){
      return true;
    }
    // Verificamos si algun concepto del universo es finalConcept e intentamos llegar a el
    finalConcept = this.universeConceptBag.findConceptByValue(finalConcept.value);
    if(finalConcept == null){
      return false;  // No hay forma de llegar al concepto porque no existe en el universo
    }
    // Si no tiene dependencias, quiere decir que es un elemento primario, deberia haber estado entre los knownConcepts. No es posible llegar a el.
    if(finalConcept.inputConcepts.length == 0){
      return false;
    }
    // Verificamos si podemos llegar a cada una de sus dependencias
    for (var i = 0; i < finalConcept.inputConcepts.length; i++) {
        var concept = finalConcept.inputConcepts[i];
        if(!this.internalGetInference(knownConcepts, concept)){
			console.log("No se pudo inferir: " + concept.value);
			return false;
        }
    }
    // Ya comprobamos que podemos llegar al concepto, los agregamos como conceptos conocidos
    for (var i = 0; i < finalConcept.inputConcepts.length; i++) {
        knownConcepts.add(finalConcept.inputConcepts[i]);
    }
    return true;
  }
}
