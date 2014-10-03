"use strict";

var CompositeView = require("../composite").View;
var $$ = require ("substance-application").$$;

// Substance.Figure.View
// ==========================================================================

var FigureView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);
};

FigureView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {

    this.el.innerHTML = "";
    this.content = $$('div.content');

    if (this.node.url) {
      // Add graphic (img element)
      var imgEl = $$('.image-wrapper', {
        children: [
          $$("a", {
            href: this.node.url,
            target: "_blank",
            children: [$$("img", {src: this.node.url})]
          })
        ]
      });
      this.content.appendChild(imgEl);      
    }

    var caption = this.node.getCaption();
    if (caption) {
      var captionView = this.viewFactory.createView(caption);
      var captionEl = captionView.render().el;
      this.content.appendChild(captionEl);
      this.childrenViews.push(captionView);
    }

    // Attrib
    if (this.node.attrib) {
      console.log('ATTRIB!!');
      this.content.appendChild($$('.figure-attribution', {text: this.node.attrib}));
    }

    this.el.appendChild(this.content);
    return this;
  };
};

FigureView.Prototype.prototype = CompositeView.prototype;
FigureView.prototype = new FigureView.Prototype();

module.exports = FigureView;
