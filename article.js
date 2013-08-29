"use strict";

var _ = require("underscore");
var util = require("substance-util");
var Document = require("substance-document");

// Lens.Article
// -----------------

var Article = function(options) {
  options = options || {};

  // Check if format is compatible

  // Extend Schema
  // --------

  options.schema = util.deepclone(Document.schema);

  options.schema.id = "lens-article";
  options.schema.version = "0.1.0";

  // Merge in custom types
  _.each(Article.types, function(type, key) {
    options.schema.types[key] = type;
  });

  // Register annotation types
  _.each(Article.annotations, function(aType, key) {
    options.schema.types[key] = aType;
  });


  // Merge in node types
  _.each(Article.nodeTypes, function(node, key) {
    options.schema.types[key] = node.type;
  });

  // Merge in custom indexes
  _.each(Article.indexes, function(index, key) {
    options.schema.indexes[key] = index;
  });

  // Call parent constructor
  // --------

  Document.call(this, options);

  this.nodeTypes = Article.nodeTypes;

  // Seed the doc
  // --------

  if (options.seed === undefined) {
    this.create({
      id: "document",
      type: "document",
      guid: options.id, // external global document id
      creator: options.creator,
      created_at: options.created_at,
      views: ["content"], // is views really needed on the instance level
      title: "",
      abstract: ""
    });

    // Create views on the doc
    _.each(Article.views, function(view) {
      this.create({
        id: view,
        "type": "view",
        nodes: []
      });
    }, this);
  }
};



// Renders an article
// --------
//

Article.Renderer = function(doc) {
  this.doc = doc;
  // var that = this;

  this.nodeTypes = Article.nodeTypes;

  // Collect all node views
  this.nodes = {};

  // Build views
  _.each(this.doc.getNodes(), function(node) {
    this.nodes[node.id] = this.createView(node);
  }, this);

};

Article.Renderer.Prototype = function() {

  // Create a node view
  // --------
  //
  // Experimental: using a factory which creates a view for a given node type
  // As we want to be able to reuse views
  // However, as the matter is still under discussion consider the solution here only as provisional.
  // We should create views, not only elements, as we need more, e.g., event listening stuff
  // which needs to be disposed later.

  this.createView = function(node) {
    var NodeView = this.nodeTypes[node.type].View;

    if (!NodeView) {
      throw new Error('Node type "'+node.type+'" not supported');
    }

    // Note: passing the factory to the node views
    // to allow creation of nested views
    var nodeView = new NodeView(node, this);

    // we connect the listener here to avoid to pass the document itself into the nodeView
    nodeView.listenTo(this.doc, "operation:applied", nodeView.onGraphUpdate);
    return nodeView;
  };

  // Render it
  // --------
  //

  this.render = function() {
    var frag = document.createDocumentFragment();

    var docNodes = this.doc.getNodes();
    _.each(docNodes, function(n) {
      frag.appendChild(this.nodes[n.id].render().el);
    }, this);
    return frag;
  };
};

Article.Renderer.prototype = new Article.Renderer.Prototype();


Article.Prototype = function() {
  this.fromSnapshot = function(data, options) {
    return Article.fromSnapshot(data, options);
  };
};

// Factory method
// --------
//
// TODO: Ensure the snapshot doesn't get chronicled

Article.fromSnapshot = function(data, options) {
  options = options || {};
  options.seed = data;
  return new Article(options);
};


// Define available views
// --------

Article.views = ["content", "figures", "citations"];


// Register node types
// --------

Article.nodeTypes = require("./nodes");


// Define annotation types
// --------

Article.annotations = {

  "strong": {
    "parent": "annotation",
    "properties": {
    }
  },

  "emphasis": {
    "properties": {
    },
    "parent": "annotation"
  },

  "subscript": {
    "properties": {
    },
    "parent": "annotation"
  },

  "superscript": {
    "properties": {
    },
    "parent": "annotation"
  },

  "underline": {
    "properties": {
    },
    "parent": "annotation"
  },

  "code": {
    "parent": "annotation",
    "properties": {
    }
  },

  "link": {
    "parent": "annotation",
    "properties": {
      "url": "string"
    }
  },

  "idea": {
    "parent": "annotation",
    "properties": {
    }
  },

  "error": {
    "parent": "annotation",
    "properties": {
    }
  },

  "question": {
    "parent": "annotation",
    "properties": {
    }
  },

  // Greenish figure references in the text

  "figure_reference": {
    "parent": "annotation",
    "properties": {
      "target": "figure"
    }
  },

  // Blueish citation references in the text

  "citation_reference": {
    "parent": "annotation",
    "properties": {
      "target": "content"
    }
  },

  "cross_reference": {
    "parent": "annotation",
    "properties": {
      "target": "content"
    }
  }

};

// Custom type definitions
// --------
//
// Holds comments

Article.types = {

  // Abstarct Annotation Node
  // --------

  "annotation": {
    "properties": {
      "path": ["array", "string"], // -> e.g. ["text_1", "content"]
      "range": "object"
    }
  },

  // Abstract Figure Type
  // --------

  "figure": {
    "properties": {
    }
  },

  // "file": {
  //   "properties": {
  //   }
  // },

  "institution": {
    "properties": {
    }
  },

  "email": {
    "properties": {
    }
  },

  "funding": {
    "properties": {
    }
  },

  "caption": {
    "properties": {
    }
  },

  // Abstract Citation Type
  // --------

  "citation": {
    "properties": {
    }
  },

  // Document
  // --------

  "document": {
    "properties": {
      "views": ["array", "view"],
      "guid": "string",
      "creator": "string",
      "title": "string",
      "authors": ["array", "person"],
      "abstract": "string"
    }
  },

  // Comments
  // --------

  "comment": {
    "properties": {
      "content": "string",
      "created_at": "string", // should be date
      "creator": "string", // should be date
      "node": "node" // references either a content node or annotation
    }
  }
};

// Custom indexes
// --------
//

Article.indexes = {
  // All annotations are now indexed by node
  "annotations": {
    "type": "annotation",
    "properties": ["node"]
  },

  // "figure_references": {
  //   "type": "figure_reference"
  // },

  // "citation_references": {
  //   "type": "citation_reference"
  // }
};



// From article definitions generate a nice reference document
// --------
//


var ARTICLE_DOC_SEED = {
  "id": "lens_article",
  "nodes": {
    "document": {
      "type": "document",
      "id": "document",
      "views": [
        "content"
      ],
      "title": "The Anatomy of a Lens Article",
      "authors": ["person_1", "person_2", "person_3"],
      "guid": "lens_article"
    },


    "content": {
      "type": "view",
      "id": "content",
      "nodes": [
        "cover",
      ]
    },

    "cover": {
      "id": "cover",
      "type": "cover"
    },

    "person_1": {
      "id": "person_1",
      "type": "person",
      "name": "Michael Aufreiter"
    },

    "person_2": {
      "id": "person_2",
      "type": "person",
      "name": "Ivan Grubisic"
    },

    "person_3": {
      "id": "person_3",
      "type": "person",
      "name": "Rebecca Close"
    }
  }
};

Article.describe = function() {
  var doc = new Article({seed: ARTICLE_DOC_SEED});

  var id = 0;

  _.each(Article.nodeTypes, function(nodeType) {
    console.log('NAME', nodeType.description.name, nodeType.type.id);

    // Create a heading for each node type
    var headingId = "heading_"+nodeType.type.id;

    doc.create({
      id: headingId,
      type: "heading",
      content: nodeType.description.name,
      level: 1
    });

    // Turn remarks and description into an introduction paragraph
    var introText = nodeType.description.remarks.join(' ');
    var introId = "paragraph_"+nodeType.type.id+"_intro";

    doc.create({
      id: introId,
      type: "paragraph",
      content: introText,
    });

    // Show it in the content view
    doc.show("content", [headingId, introId], -1);


    // Include property description
    // --------
    //

    // console.log('PROPERTY DESCRIPTIONS', nodeType.description);

    doc.create({
      id: headingId+"_properties",
      type: "paragraph",
      content: nodeType.description.name+ " uses the following properties:"
    });

    doc.show("content", [headingId+"_properties"], -1);

    var items = [];

    _.each(nodeType.description.properties, function(propertyDescr, key) {

      var listItemId = "paragraph_" + (++id);
      doc.create({
        id: listItemId,
        type: "paragraph",
        content: key +": " + propertyDescr
      });

      // Create code annotation for the propertyName
      doc.create({
        "id": id+"_annotation",
        "type": "code",
        "path": [listItemId, "content"],
        "range":[0, key.length]
      });

      items.push(listItemId);
    });

    // Create list
    doc.create({
      id: headingId+"_property_list",
      type: "list",
      items: items,
      ordered: false
    });

    // And show it
    doc.show("content", [headingId+"_property_list"], -1);


    // Include example
    // --------
    //

    doc.create({
      id: headingId+"_example",
      type: "paragraph",
      content: "Here's an example:"
      // level: 2
    });

    doc.create({
      id: headingId+"_example_codeblock",
      type: "codeblock",
      content: JSON.stringify(nodeType.example, null, '  '),
    });

    doc.show("content", [headingId+"_example", headingId+"_example_codeblock"], -1);

  });
  return doc.toJSON();
};


Article.Prototype.prototype = Document.prototype;
Article.prototype = new Article.Prototype();
Article.prototype.constructor = Article;


// Add convenience accessors for builtin document attributes
Object.defineProperties(Article.prototype, {
  id: {
    get: function () {
      return this.get("document").guid;
    },
    set: function(id) {
      this.get("document").guid = id;
    }
  },
  creator: {
    get: function () {
      return this.get("document").creator;
    },
    set: function(creator) {
      this.get("document").creator = creator;
    }
  },
  created_at: {
    get: function () {
      return this.get("document").created_at;
    },
    set: function(created_at) {
      this.get("document").created_at = created_at;
    }
  },
  title: {
    get: function () {

      return this.get("document").title;
    },
    set: function(title) {
      this.get("document").title = title;
    }
  },
  abstract: {
    get: function () {
      return this.get("document").abstract;
    },
    set: function(abstract) {
      this.get("document").abstract = abstract;
    }
  },
  authors: {
    get: function () {
      var docNode = this.get("document");
      if (docNode.authors) {
        return _.map(docNode.authors, function(personId) {
          return this.get(personId);
        }, this);
      } else {
        return "";
      }
    },
    set: function(val) {
      var docNode = this.get("document");
      docNode.authors = _.clone(val);
    }
  },
  views: {
    get: function () {
      // Note: returing a copy to avoid inadvertent changes
      return this.get("document").views.slice(0);
    }
  },
});

module.exports = Article;
