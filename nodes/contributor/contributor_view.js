"use strict";

var _ = require("underscore");
var util = require("substance-util");
var html = util.html;
var NodeView = require("../node").View;
var $$ = require("substance-application").$$;

// Lens.Contributor.View
// ==========================================================================

var ContributorView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node contributor");
};

ContributorView.Prototype = function() {

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    // Contributor Name
    // -------

    this.content.appendChild($$('.contributor-name', {text: this.node.name}));




    // Add Affiliations
    // -------

    this.content.appendChild($$('.affiliations', {
      children: _.map(this.node.getAffiliations(), function(aff) {
        
        var affText = _.compact([
          aff.department, 
          aff.institution,
          aff.city,
          aff.country
        ]).join(', ');

        return $$('.affiliation', {text: affText});
      })
    }));



    // Present Address
    // -------

    if (this.node.present_address) {
      this.content.appendChild($$('.label', {text: 'Present address'}));
      this.content.appendChild($$('.contribution', {text: this.node.present_address}));
    }

    // Contribution
    // -------

    if (this.node.contribution) {
      this.content.appendChild($$('.label', {text: 'Contribution'}));
      this.content.appendChild($$('.contribution', {text: this.node.contribution}));
    }

    // Equal contribution
    // -------

    if (this.node.equal_contrib && this.node.equal_contrib.length > 0) {
      this.content.appendChild($$('.label', {text: 'Contributed equally with'}));
      this.content.appendChild($$('.equal-contribution', {text: this.node.equal_contrib}));
    }


    // Emails
    // -------
    
    if (this.node.emails.length > 0) {
      this.content.appendChild($$('.label', {text: 'For correspondence'}));
      this.content.appendChild($$('.emails', {
        children: _.map(this.node.emails, function(email) {
          return $$('a', {href: "mailto:"+email, text: email});
        })
      }));
    }


    // Funding
    // -------

    if (this.node.fundings.length > 0) {
      this.content.appendChild($$('.label', {text: 'Funding'}));
      this.content.appendChild($$('.fundings', {
        children: _.map(this.node.fundings, function(funding) {
          return $$('.funding', {text: funding});
        })
      }));
    }


    // Competing interests
    // -------
    
    if (this.node.competing_interests.length > 0) {
      this.content.appendChild($$('.label', {text: 'Competing Interests'}));
      this.content.appendChild($$('.competing-interests', {
        children: _.map(this.node.competing_interests, function(ci) {
          return $$('.conflict', {text: ci});
        })
      }));
    }


    // ORCID if available
    // -------
    
    if (this.node.orcid) {
      this.content.appendChild($$('.label', { text: 'ORCID' }));
      this.content.appendChild($$('a.orcid', { href: this.node.orcid, text: this.node.orcid }));
    }


    // Group member (in case contributor is a person group)
    // -------

    if (this.node.members.length > 0) {
      this.content.appendChild($$('.label', {text: 'Group Members'}));
      this.content.appendChild($$('.members', {
        children: _.map(this.node.members, function(member) {
          return $$('.member', {text: member});
        })
      }));
    }


    // Contributor Bio
    // -------

    if (this.node.image || (this.node.bio && this.node.bio.length > 0) ) {
      var bio = $$('.bio');
      var childs = [$$('img', {src: this.node.image}), bio];

      _.each(this.node.bio, function(par) {
        var parNode = this.node.document.get(par);
        var paragraphView = this.viewFactory.createView(parNode);
        var paragraphViewEl = paragraphView.render().el;
        bio.appendChild(paragraphViewEl);
      }, this);

      this.content.appendChild($$('.contributor-bio.container', {
        children: childs
      }));
    }

    // Deceased?
    // -------

    if (this.node.deceased) {
      // this.content.appendChild($$('.label', {text: 'Present address'}));
      this.content.appendChild($$('.label', {text: "* Deceased"}));
    }

    return this;
  };

};

ContributorView.Prototype.prototype = NodeView.prototype;
ContributorView.prototype = new ContributorView.Prototype();

module.exports = ContributorView;
