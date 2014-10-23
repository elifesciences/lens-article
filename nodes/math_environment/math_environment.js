"use strict";

var DocumentNode = require('substance-document').Node;

var MathEnvironment = function(node, document) {
  DocumentNode.call(this, node, document);
};


MathEnvironment.type = {
  "parent": "content",
  "properties": {
    "source_id": "string",
    "envType": "string",
    "title": "string",
    "body": ["array", "paragraph"]
  }
};

MathEnvironment.Prototype = function() {
};

MathEnvironment.Prototype.prototype = DocumentNode.prototype;
MathEnvironment.prototype = new MathEnvironment.Prototype();
MathEnvironment.prototype.constructor = MathEnvironment;

DocumentNode.defineProperties(MathEnvironment.prototype, ["source_id", "type", "title", "body"]);

module.exports = MathEnvironment;
