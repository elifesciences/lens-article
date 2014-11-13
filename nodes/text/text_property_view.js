"use strict";

var View = require("substance-application").View;

var Document = require("substance-document");
var Annotator = Document.Annotator;
var $$ = require("substance-application").$$;

// Substance.TextPropertyView
// -----------------
//

var TextPropertyView = function(doc, path, viewFactory, options) {
  options = options || {};
  options.elementType = options.elementType || 'span';
  View.call(this, options);

  this.path = path;
  this.document = doc;
  this.viewFactory = viewFactory;
  this.options = options || {};

  this.property = doc.resolve(this.path);
  this.$el.addClass('text');
  if (this.options.classes) {
    this.$el.addClass(this.options.classes);
  }

  this._annotations = {};
};

TextPropertyView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    this.el.innerHTML = "";
    this._annotations = this.document.getIndex("annotations").get(this.path);
    this.renderWithAnnotations(this._annotations);
    return this;
  };

  this.dispose = function() {
    this.stopListening();
  };

  this.createAnnotationElement = function(entry) {
    if (this.options.createAnnotationElement) {
      return this.options.createAnnotationElement.call(this, entry);
    } else {
      var el;
      if (entry.type === "link") {
        el = $$('a.annotation.'+entry.type, {
          id: entry.id,
          href: this.node.document.get(entry.id).url // "http://zive.at"
        });
      } else {
        el = $$('span.annotation.'+entry.type, {
          id: entry.id
        });
      }
      return el;
    }
  };

  this.renderWithAnnotations = function(annotations) {
    var that = this;
    var text = this.property.get();
    var fragment = document.createDocumentFragment();
    var doc = this.document;

    var annotationViews = [];

    // this splits the text and annotations into smaller pieces
    // which is necessary to generate proper HTML.
    var fragmenter = new Annotator.Fragmenter();
    fragmenter.onText = function(context, text) {
      context.appendChild(document.createTextNode(text));
    };
    fragmenter.onEnter = function(entry, parentContext) {
      var anno = doc.get(entry.id);
      var annotationView = that.viewFactory.createView(anno);
      parentContext.appendChild(annotationView.el);
      annotationViews.push(annotationView);
      return annotationView.el;
    };
    // this calls onText and onEnter in turns...
    fragmenter.start(fragment, text, annotations);

    // allow all annotationViews to (re-)render to allow annotations with custom
    // rendering (e.g., inline-formulas)
    for (var i = 0; i < annotationViews.length; i++) {
      annotationViews[i].render();
    }

    // set the content
    this.el.innerHTML = "";
    this.el.appendChild(fragment);
  };
};

TextPropertyView.Prototype.prototype = View.prototype;
TextPropertyView.prototype = new TextPropertyView.Prototype();

module.exports = TextPropertyView;
