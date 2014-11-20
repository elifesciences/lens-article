"use strict";

var TextNode = require("../text").Model;

var Codeblock = function(node, document) {
  TextNode.call(this, node, document);
};

// Type definition
// --------

Codeblock.type = {
  "id": "codeblock",
  "parent": "node",
  "properties": {
    "content": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

Codeblock.description = {
  "name": "Codeblock",
  "remarks": [
    "Text in a codeblock is displayed in a fixed-width font, and it preserves both spaces and line breaks"
  ],
  "properties": {
    "content": "Content",
  }
};


// Example Formula
// -----------------
//

Codeblock.example = {
  "type": "codeblock",
  "id": "codeblock_1",
  "content": "var code = \"Sun\";\nvar op1 = null;\nTextNode = op2.apply(op1.apply(TextNode));\nconsole.log(TextNode);",
};

Codeblock.Prototype = function() {};

Codeblock.Prototype.prototype = TextNode.prototype;
Codeblock.prototype = new Codeblock.Prototype();
Codeblock.prototype.constructor = Codeblock;

module.exports = Codeblock;
