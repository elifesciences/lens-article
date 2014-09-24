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

    // Published date
    // 

    if (this.node.published_on) {
      var publishedOn = $$('.published-on.container', {
        children: [
          $$('div.label', {text: "Published"}),
          $$('div.value', {
            html: articleUtil.formatDate(this.node.published_on)
          })
        ]
      });
      metaData.appendChild(publishedOn);
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
    // articleInfoView.classList.add('caption-title');
    this.content.appendChild(articleInfoViewEl);

    // metaData.appendChild($$('.bla', {text: ));

    // var tableRows = [
    //   $$('tr', {
    //     children: [
    //       $$('td', {
    //         colspan: 2,
    //         children: [
    //           $$('div.label', {text: "Article Type"}),
    //           $$('div', {text: this.node.article_type})
    //         ]
    //       })
    //     ]
    //   }),
    //   $$('tr', {
    //     children: [
    //       $$('td', {
    //         children: [
    //           $$('div.label', {text: "Subject"}),
    //           $$('div.value', {text: this.node.subjects.join(', ')})
    //         ]
    //       }),
    //       $$('td', {
    //         children: [
    //           $$('div.label', {text: "Organism"}),
    //           $$('div.value', {text: this.node.research_organisms.join(', ')})
    //         ]
    //       })
    //     ]
    //   }),
    //   $$('tr', {
    //     children: [
    //       $$('td', {
    //         colspan: 2,
    //         children: [
    //           $$('div.label', {text: "Keywords"}),
    //           $$('div.value', {text: this.node.keywords.join(', ')})
    //         ]
    //       })
    //     ]
    //   })
    // ];


    // Display related article if there is any
    // ----------------

    // if (this.node.related_article) {
    //   tableRows.push($$('tr', {
    //     children: [
    //       $$('td', {
    //         colspan: 2,
    //         children: [
    //           $$('div.label', {text: "Related Article"}),
    //           $$('a.value', {href: this.node.related_article, text: this.node.related_article})
    //         ]
    //       })
    //     ]
    //   }));
    // }

    // var catTbl = $$('table.categorization', {
    //   children: [ $$('tbody', { children: tableRows }) ]
    // });

    // this.content.appendChild(catTbl);
      
    // Prepare for download the JSON
    // var json = JSON.stringify(this.node.document.toJSON(), null, '  ');
    // var bb = new Blob([json], {type: "application/json"});

    // var links = $$('.links', {
    //   children: [
    //     $$('a.link pdf-link', {
    //       href: this.node.pdf_link,
    //       html: '<i class="icon-download-alt"></i> PDF'
    //     }),
    //     $$('a.link.json-link', {
    //       href: window.URL ? window.URL.createObjectURL(bb) : "#",
    //       html: '<i class="icon-download-alt"></i> JSON'
    //     }),
    //     $$('a.link.xml-link', {
    //       href: this.node.xml_link,
    //       html: '<i class="icon-download-alt"></i> XML'
    //     }),
    //     $$('a.link.doi-link', {
    //       href: this.node.doi,
    //       html: '<i class="icon-external-link-sign"></i> DOI'
    //     })
    //   ]
    // });

    // this.content.appendChild(links);

    return this;
  };

  this.dispose = function() {
    NodeView.prototype.dispose.call(this);
  };
};

PublicationInfoView.Prototype.prototype = NodeView.prototype;
PublicationInfoView.prototype = new PublicationInfoView.Prototype();

module.exports = PublicationInfoView;
