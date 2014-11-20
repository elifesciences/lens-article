"use strict";

var _ = require('underscore');
var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var ResourceView = require('../resource/resource_view');

// Lens.Supplement.View
// ==========================================================================

var SupplementView = function(node, viewFactory, options) {
  NodeView.call(this, node, viewFactory);
  // Mix-in
  ResourceView.call(this, options);
};

SupplementView.Prototype = function() {

  // Mix-in
  _.extend(this, ResourceView.prototype);

  this.renderBody = function() {
    if (this.caption) {
      var captionView = this.createChildView(this.caption);
      var captionViewEl = captionView.render().el;
      this.content.appendChild(captionViewEl);
    }
    var file = $$('div.file', {
      children: [
        $$('a', {href: this.node.url, html: '<i class="icon-download-alt"/> Download' })
      ]
    });
    this.content.appendChild(file);
  };
};

SupplementView.Prototype.prototype = NodeView.prototype;
SupplementView.prototype = new SupplementView.Prototype();
SupplementView.prototype.constructor = SupplementView;

module.exports = SupplementView;
