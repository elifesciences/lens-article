"use strict";

var _ = require('underscore');

var NodeView = require("../node").View;


// Lens.Box.View
// ==========================================================================

var MathEnvironmentView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node math-environment");
};

MathEnvironmentView.Prototype = function() {

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    var $content = $(this.content);
    $content.append($('<div>').addClass('title').text(this.node.title));

    var nodeIds = this.node.body;
    _.each(nodeIds, function(nodeId) {
      var child = this.node.document.get(nodeId);
      var childView = this.viewFactory.createView(child);
      var childViewEl = childView.render().el;
      this.content.appendChild(childViewEl);
    }, this);

    return this;
  };
};

MathEnvironmentView.Prototype.prototype = NodeView.prototype;
MathEnvironmentView.prototype = new MathEnvironmentView.Prototype();

module.exports = MathEnvironmentView;
