"use strict";

// Note: we leave the Node in `substance-document` as it is an essential part of the API.
var Document = require("substance-document");
var DocumentNode = Document.Node;

var LensNode = function(node, document) {
  DocumentNode.call(this, node, document);
};

LensNode.Prototype = function() {

  this.__super__ = DocumentNode.prototype;

  this.toHtml = function(htmlDocument, options) {
    var el = this.__super__.toHtml.call(this, htmlDocument, options);
    el.setAttribute('data-source-id', this.source_id);
    return el;
  };

};

LensNode.Prototype.prototype = DocumentNode.prototype;
LensNode.prototype = new LensNode.Prototype();
LensNode.constructor = LensNode;

LensNode.type = {
  "id": "node",
  "parent": "content",
  "properties": {
    // Used to keep track of the genuine node (e.g. in JATS file)
    "source_id": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

LensNode.description = {
  "name": "Node",
  "remarks": [
    "Abstract node type."
  ],
  "properties": {
    "source_id": "Useful for document conversion where the original id of an element should be remembered.",
  }
};

LensNode.defineProperties = DocumentNode.defineProperties;

// Example
// -------
//

module.exports = LensNode;
