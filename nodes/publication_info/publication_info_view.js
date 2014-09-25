"use strict";

var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var articleUtil = require("../../article_util");
var _ = require("underscore");


// Lens.PublicationInfo.View
// ==========================================================================

var PublicationInfoView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass('publication-info');
  this.$el.attr('id', this.node.id);
};

PublicationInfoView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);

    // Display article meta information
    // ----------------

    var metaData = $$('.meta-data');




    // Article Type
    // 

    if (this.node.article_type) {
      var articleTypeEl = $$('.article-type.container', {
        children: [
          $$('div.label', {text: "Article Type"}),
          $$('div.value', {
            text: this.node.article_type
          })
        ]
      });
      metaData.appendChild(articleTypeEl);
    }

    // Subject
    // 

    if (this.node.subjects && this.node.subjects.length > 0) {
      var subjectEl = $$('.subject.container', {
        children: [
          $$('div.label', {text: "Subject"}),
          $$('div.value', {
            text: this.node.subjects.join(', ')
          })
        ]
      });
      metaData.appendChild(subjectEl);
    }

    // Organisms
    // 

    if (this.node.research_organisms && this.node.research_organisms.length > 0) {
      var organismsEl = $$('.subject.container', {
        children: [
          $$('div.label', {text: "Organism"}),
          $$('div.value', {
            text: this.node.research_organisms.join(', ')
          })
        ]
      });
      metaData.appendChild(organismsEl);
    }

    // Keywords
    // 

    if (this.node.keywords && this.node.keywords.length > 0) {
      var keywordsEl = $$('.keywords.container', {
        children: [
          $$('div.label', {text: "Keywords"}),
          $$('div.value', {
            text: this.node.keywords.join(', ')
          })
        ]
      });
      metaData.appendChild(keywordsEl);
    }

    // DOI
    // 

    if (this.node.doi) {
      var doiEl = $$('.doi.container', {
        children: [
          $$('div.label', {text: "DOI"}),
          $$('div.value', {
            children: [$$('a', {href: this.node.doi, text: this.node.doi, target: '_blank'})]
          })
        ]
      });
      metaData.appendChild(doiEl);
    }

    // Related Article
    // 

    if (this.node.related_article) {
      var relatedArticleEl = $$('.related-article.container', {
        children: [
          $$('div.label', {text: "Related Article"}),
          $$('div.value', {
            children: [$$('a', {href: this.node.related_article, text: this.node.related_article})]
          })
        ]
      });
      metaData.appendChild(relatedArticleEl);
    }



    // Dates
    //

    var dateFragments = [];
    if (this.node.received_on) dateFragments.push("received on <b>"+articleUtil.formatDate(this.node.received_on)+"</b>");
    if (this.node.accepted_on) dateFragments.push("accepted on <b>"+articleUtil.formatDate(this.node.accepted_on)+"</b>");
    if (this.node.published_on) dateFragments.push("published on <b>"+articleUtil.formatDate(this.node.published_on)+"</b>");

    var datesEl = $$('.dates');

    // Intro
    datesEl.appendChild($$('span', {text: "The manuscript was "}));

    if (dateFragments.length === 1) {
      datesEl.appendChild($$('span', {html: " "+dateFragments[0]+"."}));
    } else {
      // All but last frag
      datesEl.appendChild($$('span', {html: dateFragments.slice(0,-1).join(", ")}));

      // Last frag
      datesEl.appendChild($$('span', {html: " and "+_.last(dateFragments)+"."}));
    }
    metaData.appendChild(datesEl);

    this.content.appendChild(metaData);


    // Display article information
    // ----------------

    // this.content.appendChild

    var articleInfo = this.node.getArticleInfo();

    var articleInfoView = this.viewFactory.createView(articleInfo);
    var articleInfoViewEl = articleInfoView.render().el;
    this.content.appendChild(articleInfoViewEl);

    return this;
  };

  this.dispose = function() {
    NodeView.prototype.dispose.call(this);
  };
};

PublicationInfoView.Prototype.prototype = NodeView.prototype;
PublicationInfoView.prototype = new PublicationInfoView.Prototype();

module.exports = PublicationInfoView;
