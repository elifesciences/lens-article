var _ = require('underscore');
var Node = require('substance-document').Node;

// Formula
// -----------------
//

var Formula = function(node) {
  Node.call(this, node);
};

// Type definition
// -----------------
//

Formula.type = {
  "id": "formula",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "label": "string",
    "data": "string",
    "format": "string", // MathML, LaTeX, image
    "inline": "boolean"
  }
};


// This is used for the auto-generated docs
// -----------------
//

Formula.description = {
  "name": "Formula",
  "remarks": [
    "Can either be expressed in MathML format or using an image url"
  ],
  "properties": {
    "label": "Formula label (4)",
    "data": "Formula data, either MathML or image url",
    "format": "Can either be `mathml` or `image`"
  }
};


// Example Formula
// -----------------
//

Formula.example = {
  "type": "formula",
  "id": "formula_eqn1",
  "label": "(1)",
  "content": "<mml:mrow>...</mml:mrow>",
  "format": "mathml"
};

Formula.Prototype = function() {
  this.inline = false;
};

Formula.Prototype.prototype = Node.prototype;
Formula.prototype = new Formula.Prototype();
Formula.prototype.constuctor = new Formula;


// Generate getters
// --------

var getters = {};

_.each(Formula.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    }
  };
});

Object.defineProperties(Formula.prototype, getters);

module.exports = Formula;
