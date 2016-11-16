var dataCollection = require('../dataCollection');
var ItemView = require('../item/view');
var $ = require('jquery');
require('./setupExample.scss');

module.exports = function setupExample(ListClass) {
  var listView = new ListClass({
    listHeight: 320,
    itemHeight: 30,
    itemView: ItemView,
    collection: dataCollection
  });

  $('<div class="m-example__wrapper">').appendTo('body').append(listView.$el);
  listView.render();
};
