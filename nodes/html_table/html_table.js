
var DocumentNode = require('../node').Model;

// Lens.HTMLTable
// -----------------
//

var HTMLTable = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

// Type definition
// -----------------
//

HTMLTable.type = {
  "id": "html_table",
  "parent": "node",
  "properties": {
    "label": "string",
    "content": "string",
    "footers": ["array", "string"],
    "caption": "caption"
  }
};

HTMLTable.config = {
  "zoomable": true
};


// This is used for the auto-generated docs
// -----------------
//

HTMLTable.description = {
  "name": "HTMLTable",
  "remarks": [
    "A table figure which is expressed in HTML notation"
  ],
  "properties": {
    "label": "Label shown in the resource header.",
    "title": "Full table title",
    "content": "HTML data",
    "footers": "HTMLTable footers expressed as an array strings",
    "caption": "References a caption node, that has all the content"
  }
};


// Example HTMLTable
// -----------------
//

HTMLTable.example = {
  "id": "html_table_1",
  "type": "html_table",
  "label": "HTMLTable 1.",
  "title": "Lorem ipsum table",
  "content": "<table>...</table>",
  "footers": [],
  "caption": "caption_1"
};

HTMLTable.Prototype = function() {

  var __super__ = DocumentNode.prototype;

  this.getCaption = function() {
    if (this.properties.caption) return this.document.get(this.properties.caption);
  };

  this.getHeader = function() {
    return this.properties.label;
  };

  this.toHtml = function(htmlDocument, options) {
    var el = __super__.toHtml.call(this, htmlDocument, options);
    console.error("Not yet implemented: toHtml for type '%s'", this.type);
    return el;
  };

};

HTMLTable.Prototype.prototype = DocumentNode.prototype;
HTMLTable.prototype = new HTMLTable.Prototype();
HTMLTable.prototype.constructor = HTMLTable;

DocumentNode.defineProperties(HTMLTable);

module.exports = HTMLTable;
