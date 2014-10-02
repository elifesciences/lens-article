var _ = require('underscore');

var Node = require('substance-document').Node;

// Lens.ScientificData
// -----------------
//

var ScientificData = function(node, doc) {
  Node.call(this, node, doc);
};

// Type definition
// -----------------
//

ScientificData.type = {
  "id": "scientific_data",
  "parent": "content",
  "properties": {
      data: "string"
    }
};


ScientificData.Prototype = function() {

};

ScientificData.Prototype.prototype = Node.prototype;
ScientificData.prototype = new ScientificData.Prototype();
ScientificData.prototype.constructor = ScientificData;

Node.defineProperties(ScientificData.prototype, ["data"]);

module.exports = ScientificData;
