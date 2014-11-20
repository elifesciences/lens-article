"use strict";

var DocumentNode = require("../node").Model;

var Figure = function(node, document) {
  DocumentNode.call(this, node, document);
};


Figure.type = {
  "parent": "node",
  "properties": {
    "label": "string",
    "url": "string",
    "caption": "caption",
    "attrib": "string"
  }
};

Figure.config = {
  "zoomable": true
};

// This is used for the auto-generated docs
// -----------------
//

Figure.description = {
  "name": "Figure",
  "remarks": [
    "A figure is a figure is figure.",
  ],
  "properties": {
    "label": "Label used as header for the figure cards",
    "url": "Image url",
    "caption": "A reference to a caption node that describes the figure",
    "attrib": "Figure attribution"
  }
};

// Example File
// -----------------
//

Figure.example = {
  "id": "figure_1",
  "label": "Figure 1",
  "url": "http://example.com/fig1.png",
  "caption": "caption_1"
};

Figure.Prototype = function() {

  this.__super__ = DocumentNode.prototype;

  this.hasCaption = function() {
    return (!!this.properties.caption);
  };

  this.getCaption = function() {
    if (this.properties.caption) return this.document.get(this.properties.caption);
  };

  this.getHeader = function() {
    return this.properties.label;
  };

  this.toHtml = function(htmlDocument) {
    var figureEl = this.__super__.toHtml.call(this, htmlDocument, { elementType: 'figure' });
    if (this.properties.label) {
      figureEl.appendChild(this.propertyToHtml('label'));
    }
    var imgEl = htmlDocument.createElement('img');
    imgEl.setAttribute('source', this.url);
    figureEl.appendChild(imgEl)
    var caption = this.getCaption();
    if (caption) {
      figureEl.appendChild(caption.toHtml(htmlDocument));
    }
    return figureEl;
  };

};

Figure.Prototype.prototype = DocumentNode.prototype;
Figure.prototype = new Figure.Prototype();
Figure.prototype.constructor = Figure;

DocumentNode.defineProperties(Figure);

module.exports = Figure;
