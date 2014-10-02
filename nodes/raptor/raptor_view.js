"use strict";

var _ = require("underscore");
var util = require("substance-util");
var html = util.html;
var CompositeView = require("../composite").View;
var $$ = require("substance-application").$$;

// Lens.Supplement.View
// ==========================================================================

var RaptorView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node raptor");
};

RaptorView.Prototype = function() {

  // Render it
  // --------

  this.render = function () {
    var node = this.node;
    var raptorPath = this.node.img_path;
    var raptorDesc = this.node.short_description;
    var outEl;

    this.content = $$('div.content');
    outEl = document.createElement('img');
    if (raptorPath) {
      outEl.setAttribute('src', raptorPath);
       if (raptorDesc) {
          outEl.setAttribute('alt', raptorDesc);
       }
    }
    // this.content.appendChild($raptorEl.get(0));
    this.content.appendChild(outEl);
    this.el.appendChild(this.content);

    return this;
  }
};

RaptorView.Prototype.prototype = CompositeView.prototype;
RaptorView.prototype = new RaptorView.Prototype();
RaptorView.prototype.constructor = RaptorView;

module.exports = RaptorView;
