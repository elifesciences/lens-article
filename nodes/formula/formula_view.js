"use strict";

var NodeView = require('../node').View;

// FormulaView
// ===========

var FormulaView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  if (this.node.inline) {
    this.$el.addClass('inline');
  }
};

FormulaView.Prototype = function() {

  // Render the formula
  // --------

  this.render = function() {

    var format = this.node.format;
    switch (format) {
    case "mathml":
      this.$el.html(this.node.data);

      // This makes the UI freeze when many formulas are in the document.
      // MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el]);
      break;
    case "image":
      this.$el.append('<img src="'+this.node.url+'"/>');
      break;
    case "latex":
      if (this.node.inline) {
        this.$el.html("\\("+this.node.data+"\\)");
      } else {
        this.$el.html("\\["+this.node.data+"\\]");
      }

      // This makes the UI freeze when many formulas are in the document.
      // MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el]);
      break;
    default:
      console.error("Unknown formula format:", format);
    }

    // Add label to block formula
    // --------
    if (this.node.label) {
      this.$el.append($('<div class="label">').html(this.node.label));
    }


    return this;
  };
};

FormulaView.Prototype.prototype = NodeView.prototype;
FormulaView.prototype = new FormulaView.Prototype();

module.exports = FormulaView;
