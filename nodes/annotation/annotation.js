
var DocumentNode = require("../node").Model;

var Annotation = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

Annotation.type = {
  id: 'annotation',
  parent: 'content',
  properties: {
    path: ["array", "string"], // -> e.g. ["text_1", "content"]
    range: ['array', 'number']
  }
};

Annotation.Prototype = function() {

  this.getLevel = function() {
    return this.constructor.fragmentation;
  };

};

Annotation.Prototype.prototype = DocumentNode.prototype;
Annotation.prototype = new Annotation.Prototype();
Annotation.prototype.constructor = Annotation;

Annotation.NEVER = 1;
Annotation.OK = 2;
Annotation.DONT_CARE = 3;

// This is used to control fragmentation where annotations overlap.
Annotation.fragmentation = Annotation.DONT_CARE;

DocumentNode.defineProperties(Annotation);

module.exports = Annotation;
