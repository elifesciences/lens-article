"use strict";

var _ = require("underscore");
var util = require("substance-util");
var html = util.html;
var NodeView = require("../node").View;
var $$ = require("substance-application").$$;


// Lens.Box.View
// ==========================================================================

var BoxView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node box");
};

BoxView.Prototype = function() {

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    if (this.node.label) {
      var labelEl = $$('.label', {
        text: this.node.label
      });
      this.content.appendChild(labelEl);
    }

    // Create children views
    // --------
    //

    var children = this.node.children;
    _.each(children, function(nodeId) {
      var child = this.node.document.get(nodeId);
      var childView = this.viewFactory.createView(child);
      var childViewEl = childView.render().el;
      this.content.appendChild(childViewEl);
    }, this);

    this.el.appendChild(this.content);

    return this;
  };
};

BoxView.Prototype.prototype = NodeView.prototype;
BoxView.prototype = new BoxView.Prototype();

module.exports = BoxView;
