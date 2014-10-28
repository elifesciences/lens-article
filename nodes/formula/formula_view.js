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
    if (this.node.inline) {
      this.$el.addClass('inline');
    }
    if (this.node.data) {
      for (var i=0; i<this.node.data.length; i++) {
        this.renderFormula(this.node.format[i], this.node.data[i]);
      }
    }
    // Add label to block formula
    // --------
    if (this.node.label) {
      this.$el.append($('<div class="label">').html(this.node.label));
    }
    return this;
  };

  this.renderFormula = function(format, data) {
    var elType = this.node.inline ? '<span>' : '<div>';
    switch (format) {
    case "mathml":
      this.$el.append($(elType).html(data));
      break;
    case "image":
      this.$el.append('<img src="'+data+'"/>');
      break;
    case "latex":
      if (this.node.inline) {
        this.$el.append($(elType).html("\\("+data+"\\)"));
      } else {
        this.$el.append($(elType).html("\\["+data+"\\]"));
      }
      break;
    default:
      console.error("Unknown formula format:", format);
    }
  };
};

FormulaView.Prototype.prototype = NodeView.prototype;
FormulaView.prototype = new FormulaView.Prototype();

module.exports = FormulaView;
