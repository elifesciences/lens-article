var View = require("substance-application").View;

// Substance.Node.View
// -----------------

var NodeView = function(node, viewFactory) {
  View.call(this);
  this.node = node;
  this.viewFactory = viewFactory;
  if (!viewFactory) {
    throw new Error('Illegal argument. Argument "viewFactory" is mandatory.');
  }
  this.$el.addClass('content-node').addClass(node.type.replace('_', '-'));
  this.el.dataset.id = this.node.id;
};

NodeView.Prototype = function() {

  // Rendering
  // --------
  //

  this.render = function() {
    this.content = document.createElement("DIV");
    this.content.classList.add("content");
    this.el.appendChild(this.content);
    return this;
  };

  this.dispose = function() {
    this.stopListening();
  };

  this.createView = function(nodeId) {
    var childNode = this.node.document.get(nodeId);
    var view = this.viewFactory.createView(childNode);
    return view;
  };


  this.createTextView = function(options) {
    var view = this.viewFactory.createView(this.node, options, 'text');
    return view;
  };

};

NodeView.Prototype.prototype = View.prototype;
NodeView.prototype = new NodeView.Prototype();

module.exports = NodeView;
