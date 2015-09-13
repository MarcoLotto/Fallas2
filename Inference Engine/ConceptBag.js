document.write('<script src="Concept.js"></script>');

// Es simplemente un contenedor de coneptos para permitir buscar e iterar conceptos por su valor
function ConceptBag(){

  this.concepts = [];

  this.add = function(concept){
    if(!this.hasConcept(concept)){
      this.concepts.push(concept);
    }
  }

  this.hasConcept = function(concept){
    for (var i = 0; i < this.concepts.length; i++) {
        if(this.concepts[i].value == concept.value){
          return true;
        }
    }
    return false;
  }

  this.findConceptByValue = function(value){
    for (var i = 0; i < this.concepts.length; i++) {
        if(this.concepts[i].value == value){
          return this.concepts[i];
        }
    }
    return null;
  }
}
