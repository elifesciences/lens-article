"use strict";

var DocumentNode = require("../node").Model;

var ImageNode = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// -----------------
//

ImageNode.type = {
  "id": "image",
  "parent": "node",
  "properties": {
    "url": "string"
  }
};

// Example Image
// -----------------
//

ImageNode.example = {
  "type": "image",
  "id": "image_1",
  "url": "http://substance.io/image_1.png"
};

// This is used for the auto-generated docs
// -----------------
//


ImageNode.description = {
  "name": "Image",
  "remarks": [
    "Represents a web-resource for an image."
  ],
  "properties": {
    "url": "URL to a image",
  }
};

ImageNode.Prototype = function() {

  var __super__ = DocumentNode.prototype;

  this.toHtml = function(htmlDocument) {
    var el = __super__.toHtml.call(this, htmlDocument, {elementType: 'img'});
    el.setAttribute('source', this.url);
    return el;
  };
};

ImageNode.Prototype.prototype = DocumentNode.prototype;
ImageNode.prototype = new ImageNode.Prototype();
ImageNode.prototype.constructor = ImageNode;

module.exports = ImageNode;
