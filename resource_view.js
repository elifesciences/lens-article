"use strict";

var _ = require('underscore');
var NodeView = require("./nodes/node").View;
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
      headerEl.appendChild(this.renderLabel());
      if (this.options.zoom) {
        headerEl.appendChild($$('a.toggle-fullscreen', {
          "href": "#",
          "html": "<i class=\"icon-resize-full\"></i><i class=\"icon-resize-small\"></i>",
        }));
      }
      headerEl.appendChild($$('a.toggle-res.action-toggle-resource', {
        "href": "#",
        "html": "<i class=\"icon-eye-open\"></i><i class=\"icon-eye-close\"></i>"
      }));
      this.headerEl = headerEl;
      this.el.insertBefore(headerEl, this.content);
    }
  };

  this.renderLabel = function() {
    var labelEl = $$('a.name.action-toggle-resource', {
      href: "#",
      html: this.getHeader(),
    })
    return labelEl;
  };

  this.renderBody = function() {
  };

  this.getHeader = function() {
    return this.node.getHeader();
  };
};
ResourceView.prototype = new ResourceView.Prototype();

module.exports = ResourceView;
