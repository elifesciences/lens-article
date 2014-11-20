"use strict";

var DocumentNode = require("../node").Model;

var Affiliation = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

Affiliation.type = {
  "id": "affiliation",
  "parent": "node",
  "properties": {
    "city": "string",
    "country": "string",
    "department": "string",
    "institution": "string",
    "label": "string"
  }
};


Affiliation.description = {
  "name": "Affiliation",
  "description": "Person affiliation",
  "remarks": [
    "Name of a institution or organization, such as a university or corporation, that is the affiliation for a contributor such as an author or an editor."
  ],
  "properties": {
    "institution": "Name of institution",
    "department": "Department name",
    "country": "Country where institution is located",
    "city": "City of institution",
    "label": "Affilation label. Usually a number counting up"
  }
};


Affiliation.example = {
  "type": "affiliation",
  "id": "affiliation_1",
  "source_id": "aff1",
  "city": "Jena",
  "country": "Germany",
  "department": "Department of Molecular Ecology",
  "institution": "Max Planck Institute for Chemical Ecology",
  "label": "1"
};

Affiliation.Prototype = function() {

  this.__super__ = DocumentNode.prototype;

  this.toHtml = function(htmlDocument) {
    var aff = this.__super__.toHtml(htmlDocument);

    if (this.properties.label) {
      aff.appendChild(this.propertyToHtml('label'));
    }
    if (this.properties.city) {
      aff.appendChild(this.propertyToHtml('city'));
    }
    if (this.properties.country) {
      aff.appendChild(this.propertyToHtml('country'));
    }
    if (this.properties.department) {
      aff.appendChild(this.propertyToHtml('department'));
    }
    if (this.properties.institution) {
      aff.appendChild(this.propertyToHtml('institution'));
    }
    return aff;
  };

};

Affiliation.Prototype.prototype = DocumentNode.prototype;
Affiliation.prototype = new Affiliation.Prototype();
Affiliation.prototype.constructor = Affiliation;

DocumentNode.defineProperties(Affiliation);

module.exports = Affiliation;
