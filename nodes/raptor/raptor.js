var _ = require('underscore');

var Node = require('substance-document').Node;

// Lens.Raptor
// -----------------
//

var Raptor = function(node, doc) {
  Node.call(this, node, doc);
};

// Type definition
// -----------------
//

Raptor.type = {
  "id": "raptor",
  "parent": "content",
  "properties": {
      "img_path": "string",
      "short_description": "string"
    }
};


Raptor.Prototype = function() {

};

Raptor.Prototype.prototype = Node.prototype;
Raptor.prototype = new Raptor.Prototype();
Raptor.prototype.constructor = Raptor;

Node.defineProperties(Raptor.prototype, ["img_path", "short_description"]);

module.exports = Raptor;
