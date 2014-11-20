
var DocumentNode = require("../node").Model;

// Lens.Supplement
// -----------------
//

var Supplement = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

// Type definition
// -----------------
//

Supplement.type = {
  "id": "supplement",
  "parent": "node",
  "properties": {
    "label": "string",
    "url": "string",
    "caption": "caption", // contains the doi
  }
};


// This is used for the auto-generated docs
// -----------------
//

Supplement.description = {
  "name": "Supplement",
  "remarks": [
    "A Supplement entity.",
  ],
  "properties": {
    "source_id": "Supplement id as it occurs in the source NLM file",
    "label": "Supplement label",
    "caption": "References a caption node, that has all the content",
    "url": "URL of downloadable file"
  }
};

// Example Supplement
// -----------------
//

Supplement.example = {
  "id": "supplement_1",
  "source_id": "SD1-data",
  "type": "supplement",
  "label": "Supplementary file 1.",
  "url": "http://myserver.com/myfile.pdf",
  "caption": "caption_supplement_1"
};


Supplement.Prototype = function() {

  var __super__ = DocumentNode.prototype;

  this.getCaption = function() {
    if (this.properties.caption) {
      return this.document.get(this.properties.caption);
    } else {
      return null;
    }
  };

  this.getHeader = function() {
    return this.properties.label;
  };

  this.toHtml = function(htmlDocument) {
    var figureEl = __super__.toHtml.call(this, htmlDocument, { elementType: 'figure' });
    if (this.properties.label) {
      figureEl.appendChild(this.propertyToHtml('label'));
    }
    var linkEl = htmlDocument.createElement('a');
    img.setAttribute('href', this.url);
    figureEl.appendChild(linkEl);
    var caption = this.getCaption();
    if (caption) {
      figureEl.appendChild(caption.toHtml(htmlDocument));
    }
    return figureEl;
  };

};

Supplement.Prototype.prototype = DocumentNode.prototype;
Supplement.prototype = new Supplement.Prototype();
Supplement.prototype.constructor = Supplement;

DocumentNode.defineProperties(Supplement);

module.exports = Supplement;
