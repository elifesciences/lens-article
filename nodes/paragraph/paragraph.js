"use strict";

var _ = require("underscore");
var TextNode = require("../text").Model;

var Paragraph = function(node, document) {
  TextNode.call(this, node, document);
};

Paragraph.type = {
  "id": "paragraph",
  "parent": "node",
  "properties": {
    "content": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

Paragraph.description = {
  "name": "Paragraph",
  "remarks": [
    "A Paragraph can have inline elements such as images."
  ],
  "properties": {
    "content": "Text content",
  }
};

// Example
// -------
//

Paragraph.example = {
  "type": "paragraph",
  "id": "paragraph_1",
  "content ": "Foo bar."
};

Paragraph.Prototype = function() {};

Paragraph.Prototype.prototype = TextNode.prototype;
Paragraph.prototype = new Paragraph.Prototype();
Paragraph.prototype.constructor = Paragraph;

module.exports = Paragraph;
