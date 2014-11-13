var AnnotationView = require('../annotation').View;

var InlineFormulaView = function(node, viewFactory) {
  AnnotationView.call(this, node, viewFactory);
};

InlineFormulaView.Prototype = function() {

  this.createElement = function() {
    return document.createElement('span');
  };

  this.render = function() {
    var formula = this.node.document.get(this.node.target);
    var formulaView = this.viewFactory.createView(formula);
    this.el.innerHTML = formulaView.render().el.innerHTML;
    return this;
  };

};
InlineFormulaView.Prototype.prototype = AnnotationView.prototype;
InlineFormulaView.prototype = new InlineFormulaView.Prototype();

module.exports = InlineFormulaView;
