function buildUniverse(){
    var p = new Concept("p", []);
    var q = new Concept("q", []);
    var s = new Concept("s", [p, q]);
    var r = new Concept("r", []);
    var t = new Concept("t", [r]);
    var u = new Concept("u", [s, t]);
    var v = new Concept("v", [s, r]);

    var universe = new ConceptBag();
    universe.add(p); universe.add(q); universe.add(s); universe.add(r);
    universe.add(t); universe.add(u); universe.add(v);
    return universe;
  }

  function buildKnownConcepts(){
    var knownConcepts = new ConceptBag();
    knownConcepts.add( new Concept("p", []) );
    knownConcepts.add( new Concept("q", []) );
    knownConcepts.add( new Concept("r", []) );
    return knownConcepts;
  }

  function writeToScreen(title, conceptBag){
    document.write(title + "<br>");
    for (var i = 0; i < conceptBag.concepts.length; i++) {
        document.write(conceptBag.concepts[i].value + "<br>");
    }
  }