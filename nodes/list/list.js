"use strict";

var _ = require("underscore");
var DocumentNode = require("../node").Model;
var Composite = require('../composite').Model;

var List = function(node, document) {
  Composite.call(this, node, document);
};

List.type = {
  "id": "list",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "items": ["array", "paragraph"],
    "ordered": "boolean"
  }
};


// This is used for the auto-generated docs
// -----------------
//

List.description = {
  "name": "List",
  "remarks": [
    "Lists can either be numbered or bullet lists"
  ],
  "properties": {
    "ordered": "Specifies wheter the list is ordered or not",
    "items": "An array of paragraph references",
  }
};


// Example Formula
// -----------------
//

List.example = {
  "type": "list",
  "id": "list_1",
  "items ": [
    "paragraph_listitem_1",
    "paragraph_listitem_2",
  ]
};

List.Prototype = function() {

  var __super__ = Composite.prototype;

  this.getLength = function() {
    return this.properties.items.length;
  };

  this.getChildrenIds = function() {
    return _.clone(this.items);
  };

  this.getItems = function() {
    return _.map(this.properties.items, function(id) {
      return this.document.get(id);
    }, this);
  };

  this.toHtml = function(htmlDocument) {
    var elType = this.ordered ? 'ol' : 'ul';
    var listEl = __super__.toHtml.call(this, htmlDocument, { elementType: elType });
    var pEls = this.childrenToHtml(htmlDocument);
    for (var i = 0; i < pEls.length; i++) {
      // reattach the content of the paragraph element to a <li> element
      var itemEl = htmlDocument.createElement('li');
      for (var node = pEls[i].firstChild; node; node = node.nextSibling) {
        itemEl.appendChild(node);
      }
      listEl.appendChild(itemEl);
    }
    return listEl;
  };
};

List.Prototype.prototype = Composite.prototype;
List.prototype = new List.Prototype();
List.prototype.constructor = List;

DocumentNode.defineProperties(List.prototype, ["items", "ordered"]);

module.exports = List;
