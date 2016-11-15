var Backbone = require('backbone');
var data = [];

for (var i = 0; i < 10000; i++) {
  data.push({
    label: 'Row ' + i,
    message: 'This is row no. ' + i
  });
}

module.exports = new Backbone.Collection(data);
