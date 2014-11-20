"use strict";

var TextView = require('../text').View;

// Substance.Heading.View
// ==========================================================================

var ParagraphView = function() {
  TextView.apply(this, arguments);
};

ParagraphView.Prototype = function() {};

ParagraphView.Prototype.prototype = TextView.prototype;
ParagraphView.prototype = new ParagraphView.Prototype();

module.exports = ParagraphView;
