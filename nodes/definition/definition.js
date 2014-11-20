
var DocumentNode = require('../node').Model;

// Lens.Definition
// -----------------
//

var Definition = function(node) {
  DocumentNode.call(this, node);
};

// Type definition
// -----------------
//

Definition.type = {
  "id": "definition", // type name
  "parent": "node",
  "properties": {
    "title": "string",
    "description": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

Definition.description = {
  "name": "Definition",
  "remarks": [
  ],
  "properties": {
    "title": "",
    "description": "Definition description",
  }
};


// Example Definition
// -----------------
//

Definition.example = {
  "id": "definition_def1",
  "type": "Definition",
  "title": "IAP",
  "description": "Integrated Analysis Platform",
};


Definition.Prototype = function() {

  var __super__ = DocumentNode.prototype;

  // Returns the citation URLs if available
  // Falls back to the DOI url
  // Always returns an array;
  this.urls = function() {
    return this.properties.citation_urls.length > 0 ? this.properties.citation_urls
                                                    : [this.properties.doi];
  };

  this.getHeader = function() {
    if (this.properties.label) {
      return [this.properties.label,this.properties.title].join(". ");
    } else {
      return this.properties.title;
    }
  };

  this.toHtml = function(htmlDocument) {
    // TODO: alternatively we could use <p><dfn></p> or <dl><dt/><dd/></dl>
    // However, both do not exactly correspond to what we want
    var defEl = __super__.toHtml(htmlDocument);
    ["title", "description"].forEach(function(prop) {
      if (this.properties[prop]) {
        defEl.appendChild(this.propertyToHtml(prop));
      }
    });
    return defEl;
  };

};

Definition.Prototype.prototype = DocumentNode.prototype;
Definition.prototype = new Definition.Prototype();
Definition.prototype.constructor = Definition;

DocumentNode.defineProperties(Definition);

module.exports = Definition;
