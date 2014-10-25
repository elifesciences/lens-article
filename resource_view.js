"use strict";

var _ = require('underscore');
var NodeView = require("substance-nodes")['node'].View;
var $$ = require ("substance-application").$$;

var DEFAULT_OPTIONS = {
  header: false,
  zoom: false
};

// Note: this is only a mix-in.
// Call this in your Prototype function:
//     _.extend(this, ResourceView.prototype);
//
// You should call the constructor, and make use of `this.renderHeader()` somewhere in the render() implementation

var ResourceView = function(options) {
  this.options = _.extend({}, DEFAULT_OPTIONS, options);
};

ResourceView.Prototype = function() {

  // add this to the prototype so that every class that uses this mixin has this property set
  this.isResourceView = true;

  this.render = function() {
    NodeView.prototype.render.call(this);
    this.renderHeader();
    this.renderBody();
    return this;
  };

  // Rendering
  // =============================
  //

  this.renderHeader = function() {
    var node = this.node;
    if (this.options.header) {
      var headerEl = $$('.resource-header');
      headerEl.appendChild($$('a.name', {
          href: "#",
          text: this.node.getHeader(),
          "sbs-click": "toggleResource("+node.id+")"
        }));
      if (this.options.zoom) {
        headerEl.appendChild($$('a.toggle-fullscreen', {
          "href": "#",
          "html": "<i class=\"icon-resize-full\"></i><i class=\"icon-resize-small\"></i>",
          "sbs-click": "toggleFullscreen("+node.id+")"
        }));
      }
      headerEl.appendChild($$('a.toggle-res', {
        "href": "#",
        "sbs-click": "toggleResource("+node.id+")",
        "html": "<i class=\"icon-eye-open\"></i><i class=\"icon-eye-close\"></i>"
      }));
      this.el.insertBefore(headerEl, this.content);
    }
  };

  this.renderBody = function() {
  };

};
ResourceView.prototype = new ResourceView.Prototype();

module.exports = ResourceView;
