var _ = require('underscore');
var Node = require('substance-document').Node;

// Lens.ArticleRelationship
// -----------------
//

var ArticleRelationship = function(node, doc) {
  Node.call(this, node, doc);
};

// Type definition
// -----------------
//

ArticleRelationship.type = {
  "id": "article_relationship",
  "parent": "content",
  "properties": {
    "source": "string",
    "target": "string",
    "relationship_type": "string",
    "description": "string",
    "creator": ["string"]
  }
};

// This is used for the auto-generated docs
// -----------------
//

ArticleRelationship.description = {
  "name": "Citation",
  "remarks": [
    "A relationhip between two articles.",
  ],
  "properties": {
    "source": "Relating Article",
    "target": "Related article",
    "relationship_type": "Relationship type such as Insight, Research Advance, etc.",
    "description": "Prose description of relationship.",
    "creator": "Creator of the relationship"
  }
};

// Example ArticleRelationship
// -----------------
//

ArticleRelationship.example = {
  "id": "article_relationship_1",
  "type": "article_relationship",
  "source": "00005",
  "target": "00017",
  "relationship_type": "Response",
  "description": "Method X is advanced by the authors of 00017.",
  "creator": "John Doe"
};


ArticleRelationship.Prototype = function() {
  
};

ArticleRelationship.Prototype.prototype = Node.prototype;
ArticleRelationship.prototype = new ArticleRelationship.Prototype();
ArticleRelationship.prototype.constructor = ArticleRelationship;

// Generate getters
Node.defineProperties(ArticleRelationship.prototype, Object.keys(ArticleRelationship.type.properties));

module.exports = ArticleRelationship;
