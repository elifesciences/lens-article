
var Document = require('substance-document');
var Annotation = require('../annotation/annotation');

var InlineImage = function(node, doc) {
  Annotation.call(this, node, doc);
};

InlineImage.type = {
  id: "link",
  parent: "annotation",
  properties: {
    "url": "string"
  }
};

InlineImage.Prototype = function() {};
InlineImage.Prototype.prototype = Annotation.prototype;
InlineImage.prototype = new InlineImage.Prototype();
InlineImage.prototype.constructor = InlineImage;

// Do not fragment this annotation
InlineImage.fragmentation = Annotation.NEVER;

Document.Node.defineProperties(InlineImage);

module.exports = InlineImage;
