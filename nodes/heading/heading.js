"use strict";

var DocumentNode = require("../node").Model;
var TextNode = require("../text").Model;

var Heading = function(node, document) {
  TextNode.call(this, node, document);
};

// Type definition
// -----------------
//

Heading.type = {
  "id": "heading",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "content": "string",
    "level": "number"
  }
};

// Example Heading
// -----------------
//

Heading.example = {
  "type": "heading",
  "id": "heading_1",
  "content": "Introduction",
  "level": 1
};

// This is used for the auto-generated docs
// -----------------
//


Heading.description = {
  "name": "Heading",
  "remarks": [
    "Denotes a section or sub section in your article."
  ],
  "properties": {
    "content": "Heading content",
    "level": "Heading level. Ranges from 1..4"
  }
};

Heading.Prototype = function() {

  this.__super__ = TextNode.prototype;

  this.toHtml = function(htmlDocument) {
    var el = this.__super__.toHtml.call(this, htmlDocument);
    console.error("Not yet implemented: toHtml for type '%s'", this.type);
    return el;
  };

};

Heading.Prototype.prototype = TextNode.prototype;
Heading.prototype = new Heading.Prototype();
Heading.prototype.constructor = Heading;

DocumentNode.defineProperties(Heading.prototype, ["level"]);

module.exports = Heading;
