document.write('<script src="ForwardIE.js"></script>');
document.write('<script src="BackwardIE.js"></script>');

function InferenceEngine(conceptUniverse){

  this.forwardIE = new ForwardIE(conceptUniverse);
  this.backwardIE = new BackwardIE(conceptUniverse);

  // Completa el array de conceptos conocidos con aquellos que pudo inferir del universo de conceptos
  this.getInferenceUsingForward = function(knownConcepts){
        this.forwardIE.getInference(knownConcepts);
  }
  this.getInferenceUsingBackward = function(knownConcepts, finalConcept){
        return this.backwardIE.getInference(knownConcepts, finalConcept);
  }
}
