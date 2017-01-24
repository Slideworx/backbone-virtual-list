var VirtualListComponent = require('../../../../src/index');
require('./jquery.mousewheel.min');
require('./perfect-scrollbar');
require('./style.scss');

module.exports = VirtualListComponent.extend({
  className: 'm-perfect-scrollbar',
  setCustomScroll: function() {
    this.$el.perfectScrollbar({
      minScrollbarLength: 20,
      suppressScrollX: true,
      includePadding: true,
      useKeyboard: false
    });
  },
  updateCustomScroll: function() {
    this.$el.perfectScrollbar('update');
  },
  removeCustomScroll: function() {
    this.$el.perfectScrollbar('destroy');
  }
});
