document.write('<script src="ForwardIE.js"></script>');
document.write('<script src="BackwardIE.js"></script>');

function InferenceEngine(conceptUniverse){

  this.forwardIE = new ForwardIE(conceptUniverse);
  this.backwardIE = new BackwardIE(conceptUniverse);

  // Completa el array de conceptos conocidos con aquellos que pudo inferir del universo de conceptos y devuelve true si logro inferir
  this.getInferenceUsingForward = function(knownConcepts, finalConcept){
        return this.forwardIE.getInference(knownConcepts, finalConcept);
  }
  this.getInferenceUsingBackward = function(knownConcepts, finalConcept){
        return this.backwardIE.getInference(knownConcepts, finalConcept);
  }
}
