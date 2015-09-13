
// Un concept es el resultado de concepts de entrada, y a su vez puede ser
// el disparador de otros concepts
function Concept(value, inputConcepts){
  this.value = value;
  this.inputConcepts = inputConcepts;

  this.addInputConcept = function(concept){
    this.inputConcepts.push(concept);
  }

  this.apply = function(concept){
    return (this.inputConcepts.indexOf(concept) >= 0);
  }
}
