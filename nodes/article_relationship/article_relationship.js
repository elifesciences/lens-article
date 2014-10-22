var DocumentNode = require('substance-document').Node;

// Lens.ArticleRelationship
// -----------------
//

var ArticleRelationship = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

// Type definition
// -----------------
//

ArticleRelationship.type = {
  "id": "article_relationship",
  "parent": "content",
  "properties": {
    "meta": "object",
    "related_article": "object",
    "relationship_type": "string",
    "description": "string",
    "creator": ["array","string"],
    "created_at": "date"
  }
};

ArticleRelationship.Prototype = function() {
};

ArticleRelationship.Prototype.prototype = DocumentNode.prototype;
ArticleRelationship.prototype = new ArticleRelationship.Prototype();
ArticleRelationship.prototype.constructor = ArticleRelationship;

// Generate getters
DocumentNode.defineProperties(ArticleRelationship.prototype, Object.keys(ArticleRelationship.type.properties));

module.exports = ArticleRelationship;
