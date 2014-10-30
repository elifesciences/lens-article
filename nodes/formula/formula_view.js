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

  var _precedence = {
    "image": 0,
    "mathml": 1,
    "latex": 2
  };

  // Render the formula
  // --------

  this.render = function() {
    if (this.node.inline) {
      this.$el.addClass('inline');
    }
    var inputs = [], i;
    for (i=0; i<this.node.data.length; i++) {
      inputs.push({
        format: this.node.format[i],
        data: this.node.data[i]
      });
    }
    inputs.sort(function(a, b) {
      return _precedence[a.format] - _precedence[b.format];
    });

    if (inputs.length > 0) {
      // TODO: we should allow to make it configurable
      // which math source format should be used in first place
      // For now, we take the first available format which is not image
      // and use the image to configure MathJax's preview.
      var hasPreview = false;
      var hasSource = false;
      var $preview;
      for (i=0; i<inputs.length; i++) {
        var format = inputs[i].format;
        var data = inputs[i].data;
        switch (format) {
          case "mathml":
            if (!hasSource) {
              var type = _types[format];
              var $scriptEl = $('<script>').attr('type', type);
              var $mml = $(data);
              // Note: we need to declare the mml namespace
              // as MathJax seems to parse the XML literally.
              $mml.attr('xmlns:mml', "mml");

              // HACK: MJ has troubles to detect the script element for
              // our display-formulas. This hack is a fallback, that adds mml
              // without the script.
              var HACK = false;
              if (HACK) {
                if (this.node.inline) {
                  $scriptEl.append($mml);
                  this.$el.append($scriptEl);
                } else {
                  this.$el.append($mml);
                  if ($preview) {
                    $preview.remove();
                  }
                  hasPreview = true;
                }
              } else {
                $scriptEl.append($mml);
                this.$el.append($scriptEl);
              }

              hasSource = true;
            }
            break;
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
              $preview = $('<div>').addClass('MathJax_Preview');
              $preview.append($('<img>').attr('src', data));
              this.$el.append($preview);
              hasPreview = true;
            }
            break;
          case "svg":
            if (!hasPreview) {
              $preview = $('<div>').addClass('MathJax_Preview');
              $preview.append($(data));
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
