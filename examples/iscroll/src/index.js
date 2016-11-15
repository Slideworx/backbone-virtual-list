var VirtualListComponent = require('../../../src/index');
var IScroll = require('./iscroll-probe');
require('./style.scss');

var VirtualIScroll = VirtualListComponent.extend({
  render: function() {
    this.$el.css('height', this.collection.length * this.itemHeight);
    this.$el.parent().css('height', this.listHeight);
  },
  setCustomScroll: function() {
    this.iScroll = new IScroll('.js-list-wrapper', {
      disableMouse: true,
      disablePointer: true,
      disableTouch: true,
      interactiveScrollbars: true,
      mouseWheel: true,
      scrollbars: true,
      scrollX: false,
      mouseWheelPrevent: false,
      probeType: 2
    });
    this.iScroll.on('scroll', this.virtualScroll.bind(this));
  },
  updateCustomScroll: function() {
    //todo
  },
  removeCustomScroll: function() {
    this.iScroll.destroy();
  },
  virtualGetFirstVisibleIndex: function() {
    if (this.iScroll) {
      return Math.floor(-this.iScroll.y / this.itemHeight);
    }
    return 0;
  },
});

var list = new VirtualIScroll({
  listHeight: 300,
  itemHeight: 30,
  itemView: require('./itemView'),
  collection: require('../../dataCollection')
});

list.$el.appendTo('.js-list-wrapper');
list.render();
