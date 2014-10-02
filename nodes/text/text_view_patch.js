var Document = require("substance-document");
var Annotator = Document.Annotator;
var $$ = require("substance-application").$$;

var _levels = {
  link: 1,
  cross_reference: 1,
  definition_reference: 1,
  figure_reference: 1,
  person_reference: 1,
  contributor_reference: 1,
  citation_reference: 1,
  strong: 2,
  emphasis: 2,
  code: 2,
  subscript: 2,
  superscript: 2,
  underline: 2,
  author_callout: 3,
  inline_image: 3,
  label: 3,
};

var createAnnotationElement = function(entry) {
  var el;
  if (entry.type === "link") {
    el = $$('a.annotation.'+entry.type, {
      id: entry.id,
      href: this.node.document.get(entry.id).url // "http://zive.at"
    });
  } else if (entry.type === "author_callout") {
    var callout = this.node.document.get(entry.id);
    el = $$('span.annotation.'+callout.style, {
      id: entry.id
    });
  } else if (entry.type === "inline_image") {
    el = $$('img.annotation.'+entry.type, {
      id: entry.id,
      src: this.node.document.get(entry.id).url
    } );
  } else {
    el = $$('span.annotation.'+entry.type, {
      id: entry.id
    });
  }
  return el;
};

var renderWithAnnotations = function(annotations) {
  var that = this;
  var text = this.property.get();
  var fragment = document.createDocumentFragment();

  // this splits the text and annotations into smaller pieces
  // which is necessary to generate proper HTML.
  var fragmenter = new Annotator.Fragmenter({levels: _levels});

  fragmenter.onText = function(context, text) {
    context.appendChild(document.createTextNode(text));
  };

  fragmenter.onEnter = function(entry, parentContext) {
    var el = that.createAnnotationElement(entry);
    parentContext.appendChild(el);
    return el;
  };

  // this calls onText and onEnter in turns...
  fragmenter.start(fragment, text, annotations);

  // set the content
  this.content.innerHTML = "";
  this.content.appendChild(fragment);
};

function monkeyPatchSubstanceTextView(TextView) {
  TextView.prototype.createAnnotationElement = createAnnotationElement;
  TextView.prototype.renderWithAnnotations = renderWithAnnotations;
}

module.exports = monkeyPatchSubstanceTextView;
