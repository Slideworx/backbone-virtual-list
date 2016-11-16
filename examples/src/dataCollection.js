var Backbone = require('backbone');

var DataCollection = Backbone.Collection.extend({
  removeRows: function(count) {
    count = count || 1;
    for (var i = 0; i < count; i++) {
      this.pop();
    }
    return this;
  },
  addRows: function(count) {
    count = count || 1;
    var currentIndex;
    for (var i = 0; i < count; i++) {
      currentIndex = this.length + 1;
      this.add({
        label: 'Row ' + currentIndex,
        message: 'This is row no. ' + currentIndex
      });
    }
    return this;
  }
});

module.exports = new DataCollection();
