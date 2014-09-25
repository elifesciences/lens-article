"use strict";

var NodeView = require("../node").View;
var $$ = require("substance-application").$$;

// Lens.ArticleRelationship.View
// ==========================================================================

var ArticleRelationshipView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node article-relationship");
};

ArticleRelationshipView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);

    // Event teaser
    // -------

    var headerEl = $$('.resource-header', {
      text: ArticleRelationshipView.labels[this.node.relationship_type] || "Related Article"
    });
    this.content.appendChild(headerEl);

    // Authors
    // -------

    this.content.appendChild($$('.authors', { text: this.node.source.authors.join(',') }));

    // Article title
    // -------

    this.content.appendChild($$('.article-title', { text: this.node.source.title }));

    // Relationship description
    // -------

    this.content.appendChild($$('.description', { text: this.node.description }));

    // Relationship creator
    // -------

    this.content.appendChild($$('.creator', { text: this.node.creator }));

    return this;
  };
};

ArticleRelationshipView.Prototype.prototype = NodeView.prototype;
ArticleRelationshipView.prototype = new ArticleRelationshipView.Prototype();

ArticleRelationshipView.labels = {
  'advance': 'Advance',
  'insight': 'Insight',
  'co-published': 'Co-Published',
  'key-reference': 'Key Reference'
};

module.exports = ArticleRelationshipView;
