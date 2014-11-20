
var _ = require('underscore');
var DocumentNode = require('../node').Model;

// Lens.Citation
// -----------------
//

var Citation = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

// Type definition
// -----------------
//

// TODO: this should really be overhauled. It is not really desirable to come up with
// a custom scheme here. We should follow CiteProc.json. Then we can use data from other service, as well as
// citation formatter such as citeproc.

Citation.type = {
  "id": "article_citation", // type name
  "parent": "node",
  "properties": {
    "title": "string",
    "label": "string",
    "authors": ["array", "string"],
    "doi": "string",
    "source": "string",
    "volume": "string",
    "citation_type": "string",
    "publisher_name": "string",
    "publisher_location": "string",
    "fpage": "string",
    "lpage": "string",
    "year": "string",
    "comment": "string",
    "citation_urls": ["array", "object"]
  }
};

// This is used for the auto-generated docs
// -----------------
//

Citation.description = {
  "name": "Citation",
  "remarks": [
    "A journal citation.",
    "This element can be used to describe all kinds of citations."
  ],
  "properties": {
    "title": "The article's title",
    "label": "Optional label (could be a number for instance)",
    "doi": "DOI reference",
    "source": "Usually the journal name",
    "volume": "Issue number",
    "citation_type": "Citation Type",
    "publisher_name": "Publisher Name",
    "publisher_location": "Publisher Location",
    "fpage": "First page",
    "lpage": "Last page",
    "year": "The year of publication",
    "comment": "Author comment.",
    "citation_urls": "A list of links for accessing the article on the web"
  }
};

// Example Citation
// -----------------
//

Citation.example = {
  "id": "article_nature08160",
  "type": "article_citation",
  "label": "5",
  "title": "The genome of the blood fluke Schistosoma mansoni",
  "authors": [
    "M Berriman",
    "BJ Haas",
    "PT LoVerde"
  ],
  "citation_type": "Journal Article",
  "doi": "http://dx.doi.org/10.1038/nature08160",
  "source": "Nature",
  "volume": "460",
  "fpage": "352",
  "lpage": "8",
  "year": "1984",
  "comment": "This is a comment.",
  "citation_urls": [
    {
      "name": "PubMed",
      "url": "http://www.ncbi.nlm.nih.gov/pubmed/19606141"
    }
  ]
};


Citation.Prototype = function() {

  this.__super__ = DocumentNode.prototype;

  // Returns the citation URLs if available
  // Falls back to the DOI url
  // Always returns an array;
  this.urls = function() {
    return this.properties.citation_urls.length > 0 ? this.properties.citation_urls
                                                    : [this.properties.doi];
  };

  this.getHeader = function() {
    return _.compact([this.properties.label, this.properties.citation_type || "Citation"]).join(' - ');
  };

  this.toHtml = function(htmlDocument) {
    var citation = this.__super__.toHtml(htmlDocument);

    citation.setAttribute('data-citation-type', this.citation_type);

    ["label", "title"].forEach(function(prop) {
      if (this.properties[prop]) {
        citation.appendChild(this.propertyToHtml(prop));
      }
    });

    this.authors.forEach(function(author) {
      var el = htmlDocument.createElement('span');
      el.setAttribute('data-property', 'author');
      el.textContent = author;
      citation.appendChild(el);
    });

    ["source", "volume", "fpage", "lpage", "year", "comment"].forEach(function(prop) {
      if (this.properties[prop]) {
        citation.appendChild(this.propertyToHtml(prop));
      }
    });

    this.citation_urls.forEach(function(citationUrl) {
      var el = htmlDocument.createElement('span');
      el.setAttribute('data-property', 'url');
      var label = htmlDocument.createElement('label');
      label.textContent = citationUrl.name;
      var link = htmlDocument.createElement('a');
      link.setAttribute('href', citationUrl.url);
      el.appendChild(label);
      el.appendChild(link);
      citation.appendChild(el);
    });

    return citation;
  };

};

Citation.Prototype.prototype = DocumentNode.prototype;
Citation.prototype = new Citation.Prototype();
Citation.prototype.constructor = Citation;

DocumentNode.defineProperties(Citation);

module.exports = Citation;
