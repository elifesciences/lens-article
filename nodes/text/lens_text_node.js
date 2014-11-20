"use strict";

var _ = require('underscore');
var Document = require('substance-document');
var TextNode = Document.TextNode;
var DocumentNode = require('../node').Model;

// Lens.TextNode
// -----------------
//

var LensTextNode = function(node, document) {
  DocumentNode.call(this, node, document);
};


LensTextNode.type = {
  "id": "text",
  "parent": "node",
  "properties": {
    "content": "string"
  }
};


// This is used for the auto-generated docs
// -----------------
//

LensTextNode.description = {
  "name": "Text",
  "remarks": [
    "A simple text fragement that can be annotated. Usually text nodes are combined in a paragraph.",
  ],
  "properties": {
    "content": "Content",
  }
};


// Example Paragraph
// -----------------
//

LensTextNode.example = {
  "type": "paragraph",
  "id": "paragraph_1",
  "content": "Lorem ipsum dolor sit amet, adipiscing elit.",
};


LensTextNode.Prototype = function() {

  // Mix in the TextNode prototype
  _.extend(this, TextNode.prototype);

  var __super__ = DocumentNode.prototype;

  // Need to copy that to delegate to the proper base class
  this.toHtml = function(htmlDocument, options) {
    var el = __super__.toHtml.call(this, htmlDocument, options);
    var prop = this.document.resolve([this.id, 'content']);
    this.annotatedTextToHtml(htmlDocument, el, prop);
    return el;
  };
};

LensTextNode.Prototype.prototype = DocumentNode.prototype;
LensTextNode.prototype = new LensTextNode.Prototype();
LensTextNode.prototype.constructor = LensTextNode;

DocumentNode.defineProperties(LensTextNode);

module.exports = LensTextNode;
