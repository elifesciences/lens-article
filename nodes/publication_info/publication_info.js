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
    "revised_on": "string",
    "published_on": "string",
    "journal": "string",
    "provider": "string",
    "article_type": "string",
    "keywords": ["array", "string"],
    "research_organisms": ["array", "string"],
    "subjects": ["array", "string"],
    "links": ["array", "objects"],
    "doi": "string",
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
    "provider": "Who is hosting this article",
    "article_type": "Research Article vs. Insight, vs. Correction etc.",
    "keywords": "Article's keywords",
    "research_organisms": "Research Organisms",
    "subjects": "Article Subjects",
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
  "provider": "eLife",
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
    },
    set: function(val) {
      this.properties[key] = val;
      return this;
    }
  };
});

Object.defineProperties(PublicationInfo.prototype, getters);

module.exports = PublicationInfo;