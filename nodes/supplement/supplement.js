var _ = require('underscore');
var Node = require('../node');

// Lens.Supplement
// -----------------
//

var Supplement = function(node, doc) {
  Node.call(this, node, doc);
};

// Type definition
// -----------------
//

Supplement.type = {
  "id": "supplement",
  "parent": "content",
  "properties": {
    "label": "string",
    "caption": "paragraph",
    "files": ["array", "file"], // elife doesn't use them yet
    "doi": "string" // optional (used by eLife atm)
  }
};


// "supplement:SD1_data": {
//   "type": "supplement",
//   "id": "supplement:SD1_data",
//   "label": "Supplementary file 1.",
//   "doi": "http://dx.doi.org/10.7554/eLife.00868.023",
//   "caption": "caption:406",
//   "graphic_id": "elife00868s001.xlsx"
// },
// "caption:406": {
//   "type": "caption",
//   "id": "caption:406",
//   "content": "(A) Strains used in this study. (B) Primers used in this study. (C) Plasmids used in this study and their mode of construction. ",
//   "source": "supplement:SD1_data"
// },

// {
//   "url": "/journals/virulence/2013VIRULENCE0013R-Sup.pdf",
//   "type": "pdf",
//   "size": "2M",
//   "name": 1
// },


// This is used for the auto-generated docs
// -----------------
//

Supplement.description = {
  "name": "Supplement",
  "remarks": [
    "A Supplement entity.",
  ],
  "properties": {
    "name": "Full name.",
  }
};

// Example Video
// -----------------
//

Supplement.example = {
  "id": "supplement_1",
  "type": "supplement",
  "label": "Supplementary file 1.",
  "doi": "http://dx.doi.org/10.7554/eLife.00868.023",
  "caption": "paragraph_caption_supplement_1"
};


Supplement.Prototype = function() {

};

Supplement.Prototype.prototype = Node.prototype;
Supplement.prototype = new Supplement.Prototype();
Supplement.prototype.constructor = Supplement;


// Generate getters
// --------

var getters = {};

_.each(Supplement.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    }
  };
});

// Get full caption node
// --------

getters["caption"] = {
  get: function() {
    // HACK: this is not yet a real solution
    if (this.properties.caption) {
      return this.document.get(this.properties.caption);
    } else {
      return "";
    }
  }
};

Object.defineProperties(Supplement.prototype, getters);



module.exports = Supplement;
