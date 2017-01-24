var VirtualListComponent = require('../../../../src/index');
var IScroll = require('./iscroll-probe');

module.exports = VirtualListComponent.extend({
  render: function() {
    this.$el.parent().css({
      height: this.listHeight,
      overflow: 'hidden',
      position: 'relative'
    });
    this.$el.css('height', this.collection.length * this.itemHeight);
  },
  setCustomScroll: function() {
    this.iScroll = new IScroll(this.$el.parent()[0], {
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
