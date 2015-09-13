document.write('<script src="ConceptBag.js"></script>');

function ForwardIE(universeConceptBag){
  this.universeConceptBag = universeConceptBag;

  // Completa los knownConcepts con toda la informacion que puede inferir a partir del universo de conceptos
  this.getInference = function(knownConcepts){
    var usedConcepts = new ConceptBag();
    var conceptUniverse = this.universeConceptBag.concepts;
    for (var i = 0; i < conceptUniverse.length; i++) {
        var concept = conceptUniverse[i];

        // ¿El concepto puede ser inferido con la informacion actual y no fue usado aun?
        if(conceptApply(concept, knownConcepts) && (!usedConcepts.hasConcept(concept))){
          if(!knownConcepts.hasConcept(concept)){
              knownConcepts.add(concept);
          }
          usedConcepts.add(concept);
        }
    }
  }

  function conceptApply(concept, knownConcepts){
    // Buscamos si tenemos toda la informacion necesaria en los knownConcepts para usar este concepto
    for (var i = 0; i < concept.inputConcepts.length; i++) {
      var consecuenceConcept = concept.inputConcepts[i];
      if(!knownConcepts.hasConcept(consecuenceConcept)){
        return false;
      }
    }
    return true;
  }
}
