"use strict";

var CompositeView = require("../composite/composite_view");

// Substance.Paragraph.View
// ==========================================================================

var ParagraphView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);
};

ParagraphView.Prototype = function() {

  this.render = function() {
    this.content = document.createElement("DIV");
    this.content.classList.add("content");

    this.renderChildren();

    this.el.appendChild(this.content);

    return this;
  };
};

ParagraphView.Prototype.prototype = CompositeView.prototype;
ParagraphView.prototype = new ParagraphView.Prototype();

module.exports = ParagraphView;
