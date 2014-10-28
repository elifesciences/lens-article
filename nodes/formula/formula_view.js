"use strict";

var NodeView = require('../node').View;

// FormulaView
// ===========

var FormulaView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);
};

FormulaView.Prototype = function() {

  var _types = {
    "latex": "math/tex",
    "mathml": "math/mml"
  };

  // Render the formula
  // --------

  this.render = function() {
    if (this.node.inline) {
      this.$el.addClass('inline');
    }
    if (this.node.data) {
      // TODO: we should allow to make it configurable
      // which math source format should be used in first place
      // For now, we take the first available format which is not image
      // and use the image to configure MathJax's preview.
      var hasPreview = false;
      var hasSource = false;
      for (var i=0; i<this.node.data.length; i++) {
        var format = this.node.format[i];
        var data = this.node.data[i];
        switch (format) {
          case "mathml":
          case "latex":
            if (!hasSource) {
              var type = _types[format];
              if (!this.node.inline) type += "; mode=display";
              var $scriptEl = $('<script>')
                .attr('type', type)
                .html(data);
              this.$el.append($scriptEl);
              hasSource = true;
            }
            break;
          case "image":
            if (!hasPreview) {
              var $preview = $('<div>').addClass('MathJax_Preview');
              $preview.append($('<img>').attr('src', data));
              this.$el.append($preview);
              hasPreview = true;
            }
            break;
          default:
            console.error("Unknown formula format:", format);
        }
      }
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
