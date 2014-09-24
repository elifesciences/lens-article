"use strict";

var _ = require("underscore");
var util = require("substance-util");
var html = util.html;
var NodeView = require("../node").View;
var TextView = require("../text").View;
var $$ = require("substance-application").$$;

// Lens.Cover.View
// ==========================================================================

var CoverView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node cover");
};

var MONTH_MAPPING = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "19": "October",
  "11": "November",
  "12": "December"
};

function formatPublicationDate(pubDate) {
  var parts = pubDate.split("-");
  if (pubDate.split("-").length >= 3) {
    var localDate = new Date(pubDate);
    return localDate.toUTCString().slice(0, 16)
  } else {
    var month = parts[1].replace("0", "");
    var year = parts[0];
    return MONTH_MAPPING[month]+" "+year;
  }
}


CoverView.Prototype = function() {

  // Render it
  // --------
  //
  // .content
  //   video
  //     source
  //   .title
  //   .caption
  //   .doi

  this.render = function() {
    NodeView.prototype.render.call(this);
    var node = this.node;

    if (node.breadcrumbs && node.breadcrumbs.length > 0) {
      var breadcrumbs = $$('.breadcrumbs', {
        children: _.map(node.breadcrumbs, function(bc) {
          var html;
          if (bc.image) {
            html = '<img src="'+bc.image+'" title="'+bc.name+'"/>';
          } else {
            html = bc.name;
          }
          return $$('a', {href: bc.url, html: html})
        })
      });
      this.content.appendChild(breadcrumbs);
    }

    var pubInfo = this.node.document.get('publication_info');

    if (pubInfo) {
      if (pubInfo) {
        var pubDate = pubInfo.published_on;
        if (pubDate) {
          this.content.appendChild($$('.published-on', {
            text: formatPublicationDate(pubDate)
          }));
        }
      }
    }

    // HACK: we need to update to a newer substance version to be able to delegate
    // to sub-views.
    var titleView = new TextView(this.node, {
      path: ['document', 'title'],
      classes: 'title'
    });
    this.content.appendChild(titleView.render().el);

    var authors = $$('.authors', {
      children: _.map(node.getAuthors(), function(authorPara) {
        var paraView = this.viewFactory.createView(authorPara);
        var paraEl = paraView.render().el;
        this.content.appendChild(paraEl);
        return paraEl;
      }, this)
    });

    authors.appendChild($$('.content-node.text.plain', {
      children: [
        $$('.content', {text: this.node.document.on_behalf_of})
      ]
    }));

    this.content.appendChild(authors);

    if (pubInfo) {
      var doi = pubInfo.doi;
      if (doi) {
        this.content.appendChild($$('.doi', {
          html: 'DOI: <a href="'+doi+'">'+doi+'</a>'
        }));
      }
    }

    return this;
  }
};

CoverView.Prototype.prototype = NodeView.prototype;
CoverView.prototype = new CoverView.Prototype();

module.exports = CoverView;
