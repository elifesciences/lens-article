"use strict";

var TextView = require('../text').View;

// Substance.Heading.View
// ==========================================================================

var HeadingView = function() {
  TextView.apply(this, arguments);

  this.$el.addClass('level-'+this.node.level);
};

HeadingView.Prototype = function() {};

HeadingView.Prototype.prototype = TextView.prototype;
HeadingView.prototype = new HeadingView.Prototype();

module.exports = HeadingView;
