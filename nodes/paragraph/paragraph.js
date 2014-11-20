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

Paragraph.Prototype = function() {

  var __super__ = TextNode.prototype;

  this.toHtml = function(htmlDocument) {
    var el = __super__.toHtml.call(this, htmlDocument, { elementType: 'p' });
    return el;
  };

};

Paragraph.Prototype.prototype = TextNode.prototype;
Paragraph.prototype = new Paragraph.Prototype();
Paragraph.prototype.constructor = Paragraph;

module.exports = Paragraph;
