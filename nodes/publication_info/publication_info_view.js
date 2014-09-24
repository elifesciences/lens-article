"use strict";

var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var _ = require("underscore");

// Substance.Image.View
// ==========================================================================

var PublicationInfoView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass('publication-info');
  this.$el.attr('id', this.node.id);
};

PublicationInfoView.Prototype = function() {

  // Rendering
  // =============================
  //


  // Render Markup
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);
    
    // Prepare for download the JSON
    var json = JSON.stringify(this.node.document.toJSON(), null, '  ');
    var bb = new Blob([json], {type: "application/json"});


    var children = [];

    children.push($$('a.link.xml-link', {
      href: this.node.fulltext_link,
      html: '<i class="icon-external-link-sign"></i> Original Article'
    }));

    if (this.node.related_article) {
      children.push($$('a.link.xml-link', {
        href: this.node.related_article,
        html: '<i class="icon-external-link-sign"></i> Related Article'
      }));      
    }

    if (this.node.supplements.length > 0) {
      _.each(this.node.supplements, function(sup) {

        children.push($$('a.link.xml-link', {
          href: sup.url,
          html: '<i class="icon-external-link-sign"></i> '+sup.label
        }));
      });
    }

    var links = $$('.links', {
      children: children
    });

    this.content.appendChild(links);

    return this;
  };

  this.dispose = function() {
    NodeView.prototype.dispose.call(this);
  };
};

PublicationInfoView.Prototype.prototype = NodeView.prototype;
PublicationInfoView.prototype = new PublicationInfoView.Prototype();

module.exports = PublicationInfoView;
