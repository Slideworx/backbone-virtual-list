var VirtualListComponent = require('../../../src/index');
var IScroll = require('./iscroll-probe');
var $ = require('jquery');
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
    this.iScroll.refresh();
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
  virtualExpanderSync: function() {
    this.__expander.style.height = this.collection.length * this.itemHeight + 'px';
    this.$el.css('height', this.collection.length * this.itemHeight);
  }
});

var list = new VirtualIScroll({
  listHeight: 300,
  itemHeight: 30,
  itemView: require('./itemView'),
  collection: require('../../dataCollection')
});

list.$el.appendTo('.js-list-wrapper');
list.render();

$('.js-add').on('click', function() {
  var i = list.collection.length;
  list.collection.add({
    label: 'Row ' + i,
    message: 'This is row no. ' + i
  });
});
$('.js-add-1000').on('click', function() {
  var startingIndex = list.collection.length;
  for (var i = startingIndex; i < startingIndex + 1000; i++) {
    list.collection.add({
      label: 'Row ' + i,
      message: 'This is row no. ' + i
    });
  }
});

$('.js-remove').on('click', function() {
  list.collection.pop();
});

$('.js-remove-1000').on('click', function() {
  for (var i = 0; i < 1000; i++) {
    list.collection.pop();
  }
});
