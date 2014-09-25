"use strict";

var Node = require("substance-document").Node;
var _ = require("underscore");

var PublicationInfo = function(node, doc) {
  Node.call(this, node, doc);
};


PublicationInfo.type = {
  "id": "publication_info",
  "parent": "content",
  "properties": {
    "received_on": "string",
    "accepted_on": "string",
    "published_on": "string",
    "journal": "string",
    "article_type": "string",
    "keywords": ["array", "string"],
    "research_organisms": ["array", "string"],
    "subjects": ["array", "string"],
    "pdf_link": "string",
    "xml_link": "string",
    "fulltext_link": "string",
    "json_link": "string",
    "links": ["array", "objects"],
    "doi": "string",
    "supplements": ["array", "object"],
    "related_article": "string",
    "article_info": "paragraph"
  }
};


PublicationInfo.description = {
  "name": "PublicationInfo",
  "description": "PublicationInfo Node",
  "remarks": [
    "Summarizes the article's meta information. Meant to be customized by publishers"
  ],
  "properties": {
    "received_on": "Submission received",
    "accepted_on": "Paper accepted on",
    "published_on": "Paper published on",
    "journal": "The Journal",
    "article_type": "Research Article vs. Insight, vs. Correction etc.",
    "keywords": "Article's keywords",
    "research_organisms": "Research Organisms",
    "subjects": "Article Subjects",
    "pdf_link": "A link referencing the PDF version for print",
    "xml_link": "A link referencing the original NLM XML file",
    "fulltext_link": "A link referencing the original HTML verison of the article",
    "json_link": "A link pointing to the JSON version of the article",
    "supplements": "A list of links to supplemental material",
    "doi": "Article DOI",
    "related_article": "DOI of related article if there is any"
  }
};


PublicationInfo.example = {
  "id": "publication_info",
  "received_on": "2012-06-20",
  "accepted_on": "2012-09-05",
  "published_on": "2012-11-13",
  "journal": "eLife",
  "article_type": "Research Article",
  "keywords": [
    "innate immunity",
    "histones",
    "lipid droplet",
    "anti-bacterial"
  ],
  "research_organisms": [
    "B. subtilis",
    "D. melanogaster",
    "E. coli",
    "Mouse"
  ],
  "subjects": [
    "Immunology",
    "Microbiology and infectious disease"
  ],
  "pdf_link": "http://elife.elifesciences.org/content/1/e00003.full-text.pdf",
  "xml_link": "https://s3.amazonaws.com/elife-cdn/elife-articles/00003/elife00003.xml",
  "json_link": "http://cdn.elifesciences.org/documents/elife/00003.json",
  "doi": "http://dx.doi.org/10.7554/eLife.00003"
};


PublicationInfo.Prototype = function() {
  this.getArticleInfo = function() {
    return this.document.get("articleinfo");
  }
};


PublicationInfo.Prototype.prototype = Node.prototype;
PublicationInfo.prototype = new PublicationInfo.Prototype();
PublicationInfo.prototype.constructor = PublicationInfo;


// Generate getters
// --------

var getters = {};

_.each(PublicationInfo.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    }
  };
});

Object.defineProperties(PublicationInfo.prototype, getters);

module.exports = PublicationInfo;