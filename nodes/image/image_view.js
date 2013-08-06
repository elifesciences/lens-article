"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;
var Node = require("../node");

// Substance.Image.View
// ==========================================================================

// TODO: 

var ImageView = function(node) {
  Node.View.call(this, node);


  this.$el.addClass('image');
  this.$el.attr('id', this.node.id);
};

ImageView.Prototype = function() {

  // Rendering
  // =============================
  //

  //  <!-- Lens.Image -->
  // <script type="text/x-ejs-template" name="node_image">
  //   <div id="node_<%= _.htmlId(node.id) %>" class="content-node resource figure image">
  //     <div class="resource-header">
  //       <% var refs = doc.find("reverse_figure_references", node.id) || []; %>
  //       <div class="reference-count">mentioned <%= refs.length > 1 ? refs.length +" times" : "once" %></div>
  //       <div class="type figure image"><i class="icon-camera"></i> Image</div>
  //       <div class="name"><%= node.label %></div>
  //     </div>
  //     <div class="image-wrapper">
  //       <img id="image_<%= _.htmlId(node.id) %>" class="thumbnail" src="<%= node.url %>"/>
  //     </div>

  //     <div class="large-image-wrapper" style="display: none;">
  //       <div class="figure-info">
  //         <div class="name"><%= node.label %> - <%= annotate(node.caption, 'title') %> </div>
  //         <div class="close-zoom" href="#"><i class="icon-remove-sign"></i> Close</div>
  //       </div>
  //       <img id="large_image_<%= _.htmlId(node.id) %>" src="<%= node.large_url %>"/>
  //     </div>

  //     <div class="title"><%= annotate(node.caption, 'title') %></div>
  //     <div class="descr"><%= annotate(node.caption, 'content') %></div>
  //     <% if (node.doi) { %>
  //       <div class="doi"><b>DOI:</b> <a href="<%= node.doi %>" target="_new"><%= node.doi %></a></div>
  //     <% } %>
  //   </div>
  // </script>

  this.render = function() {
    
    // Render the formula
    // --------

    this.$el.append('<div class="image-wrapper"><img src="'+this.node.url+'"/></div>');
    this.$el.append('<div class="caption">'+this.node.caption+'</div>');

    return this;
  };

  this.dispose = function() {
    this.stopListening();
  };

  this.delete = function(pos, length) {
    var content = this.$('.content')[0];
    var spans = content.childNodes;
    for (var i = length - 1; i >= 0; i--) {
      content.removeChild(spans[pos+i]);
    }
  };
};

ImageView.Prototype.prototype = Node.View.prototype;
ImageView.prototype = new ImageView.Prototype();

module.exports = ImageView;