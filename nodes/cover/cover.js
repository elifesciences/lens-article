
var _ = require('underscore');
var DocumentNode = require('../node').Model;
var articleUtil = require("../../article_util");

// Lens.Cover
// -----------------
//

var Cover = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

// Type definition
// -----------------
//

Cover.type = {
  "id": "cover",
  "parent": "node",
  "properties": {
    "authors": ["array", "paragraph"],
    "breadcrumbs": "object"
  }
};


// This is used for the auto-generated docs
// -----------------
//

Cover.description = {
  "name": "Cover",
  "remarks": [
    "Virtual view on the title and authors of the paper."
  ],
  "properties": {
    "authors": "A paragraph that has the authors names plus references to the person cards"
  }
};

// Example Cover
// -----------------
//

Cover.example = {
  "id": "cover",
  "type": "cover"
};

Cover.Prototype = function() {

  var __super__ = DocumentNode.prototype;

  this.getAuthors = function() {
    return _.map(this.properties.authors, function(paragraphId) {
      return this.document.get(paragraphId);
    }, this);
  };

  this.getTitle = function() {
    return this.document.title;
  };

  this.toHtml = function(htmlDocument) {
    var coverEl = __super__.toHtml(htmlDocument);
    var pubInfo = this.document.get('publication_info');

    if (pubInfo) {
      var pubInfoEl = htmlDocument.createElement('div');
      pubInfoEl.setAttribute('data-property', "pub-info");
      var date = pubInfo.published_on;
      var journal = pubInfo.journal;
      if (date) {
        var dateEl = htmlDocument.createElement('span');
        dateEl.setAttribute('data-property', 'date');
        dateEl.textContent = articleUtil.formatDate(date);
        pubInfoEl.appendChild(dateEl);
      }
      if (date && journal) {
        pubInfoEl.appendChild(htmlDocument.createTextElement(' in '));
      }
      if (pubInfo.journal) {
        var journalEl = htmlDocument.createElement('i');
        journalEl.setAttribute('data-property', 'journal');
        journalEl.textContent = pubInfo.journal;
        pubInfoEl.appendChild(journalEl);
      }
      coverEl.appendChild(pubInfoEl);
    }

    coverEl.appendChild(this.propertyToHtml(htmlDocument, ['document', 'title']));

    // TODO: render more (authors, links, etc.)

    return coverEl;
  };

};

Cover.Prototype.prototype = DocumentNode.prototype;
Cover.prototype = new Cover.Prototype();
Cover.prototype.constructor = Cover;

DocumentNode.defineProperties(Cover);

module.exports = Cover;
