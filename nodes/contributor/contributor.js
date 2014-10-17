var _ = require('underscore');
var Node = require('substance-document').Node;

// Lens.Contributor
// -----------------
//

var Contributor = function(node, doc) {
  Node.call(this, node, doc);
};

// Type definition
// -----------------
//

Contributor.type = {
  "id": "contributor",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "name": "string", // full name
    "role": "string",
    "affiliations": ["array", "affiliation"],
    "present_address": ["string"],
    "fundings": ["array", "string"],
    "image": "string", // optional
    "emails": ["array", "string"],
    "contribution": "string",
    "bio": ["array", "paragraph"],
    "deceased": "boolean",
    "members": ["array", "string"],
    "orcid": "string",
    "equal_contrib": ["array", "string"],
    "competing_interests": ["array", "string"]
  }
};

// This is used for the auto-generated docs
// -----------------
//

Contributor.description = {
  "name": "Contributor",
  "remarks": [
    "A contributor entity.",
  ],
  "properties": {
    "name": "Full name",
    "affiliations": "A list of affiliation ids",
    "present_address": "Present address of the contributor",
    "role": "Role of contributor (e.g. Author, Editor)",
    "fundings": "A list of funding descriptions",
    "deceased": false,
    "emails": "A list of emails",
    "orcid": "ORCID",
    "contribution": "Description of contribution",
    "equal_contrib": "A list of people who contributed equally",
    "competing_interests": "A list of conflicts",
    "members": "a list of group members"
  }
};


// Example Video
// -----------------
//

Contributor.example = {
  "id": "person_1",
  "type": "contributor",
  "name": "John Doe",
  "affiliations": ["affiliation_1", "affiliation_2"],
  "role": "Author",
  "fundings": ["Funding Organisation 1"],
  "emails": ["a@b.com"],
  "contribution": "Revising the article, data cleanup",
  "equal_contrib": ["John Doe", "Jane Doe"]
};


Contributor.Prototype = function() {
  this.getAffiliations = function() {
    return _.map(this.properties.affiliations, function(affId) {
      return this.document.get(affId);
    }, this);
  }
};

Contributor.Prototype.prototype = Node.prototype;
Contributor.prototype = new Contributor.Prototype();
Contributor.prototype.constructor = Contributor;


// Generate getters
// --------

var getters = {};

var getters = {
  header: {
    get: function() {
      // TODO: extract extract contribution type
      return "Author";
    }
  }
};

_.each(Contributor.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    }
  };
});

Object.defineProperties(Contributor.prototype, getters);

module.exports = Contributor;
