"use strict";

var TextView = require('../text').View;
var NodeView = require("../node").View;
var $$ = require("substance-application").$$;


// Substance.Heading.View
// ==========================================================================

var HeadingView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass('level-'+this.node.level);
};

HeadingView.Prototype = function() {};

HeadingView.Prototype.prototype = NodeView.prototype;
HeadingView.prototype = new HeadingView.Prototype();

module.exports = HeadingView;
