"use strict";

var DocumentNode = require('../node').Model;
var Composite = require('../composite').Model;

var Footnote = function(node, document) {
  Composite.call(this, node, document);
};

Footnote.type = {
  "id": "footnote",
  "parent": "composite",
  "properties": {
    "label": "string",
    "children": ["array", "node"]
  }
};

// This is used for the auto-generated docs
// -----------------
//

Footnote.description = {
  "name": "Footnote",
  "remarks": [
    "A Footnote is basically a Paragraph with a label."
  ],
  "properties": {
    "label": "A string used as label",
  }
};

// Example
// -------
//

Footnote.example = {
  "type": "footnote",
  "id": "footnote_1",
  "label": "a",
  "content ": [ "p_1", "p_2" ]
};

Footnote.Prototype = function() {

  var __super__ = Composite.prototype;

  // as suggested here: http://www.w3.org/TR/html5/common-idioms.html#footnotes
  // footnotes are commonly represented via 'section' element
  this.toHtml = function(htmlDocument) {
    var fnEl = __super__.toHtml.call(this, htmlDocument, {elementType: "section"});
    if (this.properties.label) {
      fnEl.appendChild(this.propertyToHtml(htmlDocument, 'label', { elementType: "label" }));
    }
    var childrenEls = this.childrenToHtml(htmlDocument);
    for (var i = 0; i < childrenEls.length; i++) {
      fnEl.appendChild(childrenEls[i]);
    }
    return fnEl;
  };

};

Footnote.Prototype.prototype = Composite.prototype;
Footnote.prototype = new Footnote.Prototype();
Footnote.prototype.constructor = Footnote;

DocumentNode.defineProperties(Footnote);

module.exports = Footnote;
