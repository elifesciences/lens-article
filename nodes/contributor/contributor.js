var _ = require('underscore');
var DocumentNode = require('../node').Model;

// Lens.Contributor
// -----------------
//

var Contributor = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

// Type definition
// -----------------
//

Contributor.type = {
  "id": "contributor",
  "parent": "node",
  "properties": {
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

  var __super__ = DocumentNode.prototype;

  this.getAffiliations = function() {
    return _.map(this.properties.affiliations, function(affId) {
      return this.document.get(affId);
    }, this);
  };

  this.getHeader = function() {
    return this.properties.role || 'Author';
  };

  this.toHtml = function(htmlDocument) {
    var contributor = __super__.toHtml(htmlDocument);

    contributor.setAttribute('data-deceased', this.deceased);

    if (this.image) {
      var imgEl = htmlDocument.create('img');
      imgEl.setAttribute('source', this.image);

    }
    contributor.appendChild(this.propertyToHtml(htmlDocument, "name"));

    if (this.bio && this.bio.length > 0) {
      var bioEl = htmlDocument.createElement('div');
      bioEl.setAttribute('data-property', 'bio');
      this.bio.forEach(function(id) {
        var p = this.document.get(id);
        bioEl.appendChild(p.toHtml(htmlDocument));
      }, this);
      contributor.appendChild(bioEl);
    }

    ["role", "contribution"].forEach(function(prop) {
      if (this.properties[prop]) {
        contributor.appendChild(this.propertyToHtml(htmlDocument, prop));
      }
    });

    if (this.equal_contrib && this.equal_contrib.length > 0) {
      var equalContribsEl = htmlDocument.createElement('div');
      equalContribsEl.setAttribute('data-property', 'equal_contribs');
      this.equal_contrib.forEach(function(name) {
        var el = htmlDocument.createElement('span');
        el.setAttribute('data-property', 'equal_contrib');
        el.textContent = name;
        equalContribsEl.appendChild(el);
      });
      contributor.appendChild(equalContribsEl);
    }

    // TODO: need to discuss how we want to deal with 'referenced' content
    this.affiliations.forEach(function(affId) {
       var aff = this.document.get(affId);
       contributor.appendChild(aff.toHtml(htmlDocument));
    }, this);

    if (this.fundings && this.fundings.length > 0) {
      var fundingsEl = htmlDocument.createElement('div');
      fundingsEl.setAttribute('data-property', 'fundings');
      this.fundings.forEach(function(name) {
        var el = htmlDocument.createElement('span');
        el.setAttribute('data-property', 'funding');
        el.textContent = name;
        fundingsEl.appendChild(el);
      });
      contributor.appendChild(fundingsEl);
    }

    // TODO: Rethink everything and add more implementation here

    return contributor;
  };

};

Contributor.Prototype.prototype = DocumentNode.prototype;
Contributor.prototype = new Contributor.Prototype();
Contributor.prototype.constructor = Contributor;

DocumentNode.defineProperties(Contributor);

module.exports = Contributor;
