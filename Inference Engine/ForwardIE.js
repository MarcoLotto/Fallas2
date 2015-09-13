document.write('<script src="ConceptBag.js"></script>');

function ForwardIE(universeConceptBag){
  this.universeConceptBag = universeConceptBag;

  // Completa los knownConcepts con toda la informacion que puede inferir a partir del universo de conceptos
  this.getInference = function(knownConcepts, finalConcept){
    var usedConcepts = new ConceptBag();
    var conceptUniverse = this.universeConceptBag.concepts;
    var knownConceptsLastIterationSize = -1;
    // Iteramos sobre los elementos hasta que no haya cambios (REVIEW: Seguro hay una forma mas performante que esta)
    while(knownConcepts.concepts.length != knownConceptsLastIterationSize){
      knownConceptsLastIterationSize = knownConcepts.concepts.length;
      for (var i = 0; i < conceptUniverse.length; i++) {
          var concept = conceptUniverse[i];

          // ¿El concepto puede ser inferido con la informacion actual y no fue usado aun?
          if(conceptApply(concept, knownConcepts) && (!usedConcepts.hasConcept(concept))){
            if(!knownConcepts.hasConcept(concept)){
                knownConcepts.add(concept);
                // Si pudimos inferir el valor que buscabamos, terminamos aca
                if(concept.value == finalConcept.value){
                  return true;
                }
            }
            usedConcepts.add(concept);
          }
      }
    }
    // Revisamos todas las inferencias posibles pero no pudimos inferir el concepto buscado
    return false;
  }

  function conceptApply(concept, knownConcepts){
    // Si el concepto no tiene dependencias, y no lo tenemos en nuestra base de conocimiento, no podemos llegar nunca a el.
    if(concept.inputConcepts.length == 0 && !knownConcepts.hasConcept(concept)){
      return false;
    }
    // Buscamos si tenemos todas las dependencias necesarias en los knownConcepts para usar este concepto
    for (var i = 0; i < concept.inputConcepts.length; i++) {
      var consecuenceConcept = concept.inputConcepts[i];
      if(!knownConcepts.hasConcept(consecuenceConcept)){
        return false;
      }
    }
    return true;
  }
}
