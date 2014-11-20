"use strict";

var _ = require('underscore');
var Document = require('substance-document');
var LensNode = require('../node').Model;

var LensComposite = function (node, document) {
  LensNode.call(this, node, document);
};

LensComposite.Prototype = function() {

  // Mix-in Document.Composite
  _.extend(this, Document.Composite.prototype);

  var __super__ = LensNode.prototype;

  this.getLength = function() {
    return this.properties.children.length;
  };

  this.getChildrenIds = function() {
    return _.clone(this.properties.children);
  };

  this.getChildren = function() {
    return _.map(this.properties.children, function(id) {
      return this.document.get(id);
    }, this);
  };

  // need to copy that method to be able to delegate to the correct
  // super class
  this.toHtml = function(htmlDocument, options) {
    var el = __super__.toHtml.call(this, htmlDocument, options);
    var childrenEls = this.childrenToHtml(htmlDocument);
    for (var i = 0; i < childrenEls.length; i++) {
      this.el.appendChild(childrenEls[i]);
    }
    return el;
  };

};
LensComposite.Prototype.prototype = LensNode.prototype;
LensComposite.prototype = new LensComposite.Prototype();
LensComposite.prototype.constructor = LensComposite;

LensComposite.type = {
  "id": "composite",
  "parent": "content",
  "properties": {
    "children": ["array", "node"]
  }
};

LensNode.defineProperties(LensComposite);

LensComposite.defineProperties = LensNode.defineProperties;

module.exports = LensComposite;