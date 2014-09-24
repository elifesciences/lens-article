"use strict";

var _ = require("underscore");
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

    this.content.appendChild($$('.event-teaser', {text: "Editorial posted on 20 Sept 2013"}));

    // Authors
    // -------

    this.content.appendChild($$('.authors', {text: "Alexandre Pfister, Marie Barberon, Julien Alassimone, Lothar Kalmbach cited this article in"}));

    // Article title
    // -------

    this.content.appendChild($$('.article-title', {text: "A receptor-like kinase mutant with absent endodermal diffusion barrier displays selective nutrient homeostasis defects"}));

    // Relationship description
    // -------

    this.content.appendChild($$('.description', {text: "The endodermis represents the main barrier to extracellular diffusion in plant roots, and it is central to current models of plant nutrient uptake. Despite this, little is known about the genes setting up this endodermal barrier. In this study, Pfister et al. report the identification and characterization of a strong barrier mutant, schengen3 (sgn3). They observe a surprising ability of the mutant to maintain nutrient homeostasis, but demonstrate a major defect in maintaining sufficient levels of the macronutrient potassium."}));

    // Relationship creator
    // -------

    this.content.appendChild($$('.creator', {text: "Ian Mulvany, Head of technology at eLife"}));

    return this;
  };
};

ArticleRelationshipView.Prototype.prototype = NodeView.prototype;
ArticleRelationshipView.prototype = new ArticleRelationshipView.Prototype();

module.exports = ArticleRelationshipView;
