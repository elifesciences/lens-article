"use strict";

var Document = require('substance-document');
var Composite = require('../composite').Model;

// Lens.Box
// -----------------
//

var Box = function(node, doc) {
  Composite.call(this, node, doc);
};

// Type definition
// -----------------
//

Box.type = {
  "id": "box",
  "parent": "node",
  "properties": {
    "label": "string",
    "children": ["array", "paragraph"]
  }
};

// This is used for the auto-generated docs
// -----------------
//

Box.description = {
  "name": "Box",
  "remarks": [
    "A box type.",
  ],
  "properties": {
    "label": "string",
    "children": "0..n Paragraph nodes",
  }
};


// Example Box
// -----------------
//

Box.example = {
  "id": "box_1",
  "type": "box",
  "label": "Box 1",
  "children": ["paragraph_1", "paragraph_2"]
};

Box.Prototype = function() {

  var __super__ = Composite.prototype;

  this.getChildrenIds = function() {
    return this.properties.children;
  };

  this.toHtml = function(htmlDocument, options) {
    var box = __super__.toHtml.call(this, htmlDocument, options);
    if (this.properties.label) {
      box.appendChild(this.propertyToHtml('label'));
    }
    var childrenEls = this.childrenToHtml(htmlDocument);
    for (var i = 0; i < childrenEls.length; i++) {
      box.appendChild(childrenEls[i]);
    }
    return box;
  };

};

Box.Prototype.prototype = Composite.prototype;
Box.prototype = new Box.Prototype();
Box.prototype.constructor = Box;

Document.Node.defineProperties(Box);

module.exports = Box;
