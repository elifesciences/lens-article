"use strict";

var TextView = require('../text').View;

// Substance.Heading.View
// ==========================================================================

var HeadingView = function() {
  TextView.apply(this, arguments);

  this.$el.addClass('level-'+this.node.level);
};

HeadingView.Prototype = function() {
  this.render = function() {
    NodeView.prototype.render.call(this);

    // Heading title
    var titleView = this.createTextPropertyView([this.node.id, 'content'], {
      classes: 'title'
    });

    if (this.node.label) {
      var labelEl = $$('.label', {text: this.node.label});
      this.content.appendChild(labelEl);
    }

    this.content.appendChild(titleView.render().el);
    return this;
  };
};

HeadingView.Prototype.prototype = TextView.prototype;
HeadingView.prototype = new HeadingView.Prototype();

module.exports = HeadingView;
