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

    var relationshipType = this.node.relationship_type_name || "Related Article";
    var publishDate = " on "+articleUtil.formatDate(this.node.related_article.published_on);

    var teaserEl = $$('.relationship-teaser.container', {
      children: [
        $$('span.type.'+this.node.relationship_type, {text: relationshipType}),
        $$('span.published-on', {text: publishDate}),
      ]
    });

    this.content.appendChild(teaserEl);

    // Authors
    // -------

    this.content.appendChild($$('.authors', { text: this.node.related_article.authors.join(', ') + " cited this article in" }));

    // Article title
    // -------

    this.content.appendChild($$('.article-title', { 
      children: [
        $$('a', {
          target: '_blank',
          href: this.node.related_article.url,
          html: [this.node.related_article.title, '<i class="icon-external-link-sign"></i>'].join(' ')
        })
      ]
    }));

    // Relationship statment
    // -------

    this.content.appendChild($$('.statement', {children: [
      $$('.text', { html: this.node.description }),
      $$('.creator', {text: this.node.creator})
      // $$('.creator', { html: ["<b>"+this.node.creator+"</b>", new Date(this.node.created_at).toDateString()].join(' on ') })
    ]}));

    return this;
  };
};

ArticleRelationshipView.Prototype.prototype = NodeView.prototype;
ArticleRelationshipView.prototype = new ArticleRelationshipView.Prototype();

// ArticleRelationshipView.labels = {
//   'advance': 'Advance',
//   'insight': 'Insight',
//   'co-published': 'Co-Published'
// };

module.exports = ArticleRelationshipView;
