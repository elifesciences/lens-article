"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;
var NodeView = require("../node").View;
var $$ = require("substance-application").$$;


// Lens.Definition.View
// ==========================================================================

var DefinitionView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass('definition');
};


DefinitionView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);

    this.content.appendChild($$('.description', {text: this.node.description }));
    return this;
  };

};

DefinitionView.Prototype.prototype = NodeView.prototype;
DefinitionView.prototype = new DefinitionView.Prototype();
DefinitionView.prototype.constructor = DefinitionView;

module.exports = DefinitionView;
