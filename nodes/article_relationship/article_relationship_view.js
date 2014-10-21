"use strict";

var _ = require("underscore");
var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var articleUtil = require("../../article_util");

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

    var relationshipType = ArticleRelationshipView.labels[this.node.relationship_type] || "Related Article";
    var publishDate = " on "+articleUtil.formatDate(this.node.source.published_on);

    var teaserEl = $$('.relationship-teaser.container', {
      children: [
        $$('span.type.'+this.node.relationship_type, {text: relationshipType}),
        $$('span.published-on', {text: publishDate}),
      ]
    });

    this.content.appendChild(teaserEl);

    // Authors
    // -------

    this.content.appendChild($$('.authors', { text: this.node.source.authors.join(', ') + " cited this article in" }));

    // Article title
    // -------

    this.content.appendChild($$('.article-title', { 
      children: [
        $$('a', {
          target: '_blank',
          href: this.node.source.url,
          html: [this.node.source.title, '<i class="icon-external-link-sign"></i>'].join(' ')
        })
      ]
    }));

    // Relationship statment
    // -------

    this.content.appendChild($$('.statement', {children: [
      $$('.text', { text: this.node.description }),
      $$('.creator', { text: _.pluck(this.node.creators, 'name') })
    ]}));

    return this;
  };
};

ArticleRelationshipView.Prototype.prototype = NodeView.prototype;
ArticleRelationshipView.prototype = new ArticleRelationshipView.Prototype();

ArticleRelationshipView.labels = {
  'advance': 'Advance',
  'insight': 'Insight',
  'co_publication': 'Co-Published',
  'key_reference': 'Key Reference'
};

module.exports = ArticleRelationshipView;
