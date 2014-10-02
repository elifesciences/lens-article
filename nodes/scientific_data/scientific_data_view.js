"use strict";

var _ = require("underscore");
var util = require("substance-util");
var html = util.html;
var CompositeView = require("../composite").View;
var $$ = require("substance-application").$$;

// Lens.Supplement.View
// ==========================================================================

var ScientificDataView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node scientific-data");
};

ScientificDataView.Prototype = function() {

  // Render it
  // --------

  this.render = function() {
    var node = this.node;
    var scientificData = this.node.data;
    this.content = $$('div.content');

    this.content.innerHTML = scientificData;
    this.el.appendChild(this.content);

    return this;
  }
};

ScientificDataView.Prototype.prototype = CompositeView.prototype;
ScientificDataView.prototype = new ScientificDataView.Prototype();
ScientificDataView.prototype.constructor = ScientificDataView;

module.exports = ScientificDataView;
