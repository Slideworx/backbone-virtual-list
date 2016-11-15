var VirtualListComponent = require('../../../src/index');
require('./style.scss');

var list = new VirtualListComponent({
  listHeight: 300,
  itemHeight: 30,
  itemView: require('./itemView'),
  collection: require('../../dataCollection')
});

list.render();
list.$el.appendTo('body');
