var Backbone = require('backbone');
var ItemViewCache = require('../utils/viewCache');
var setOption = require('../utils/setOption');

module.exports = {

  /* Can be set in extend or passed in options.
   * This is the height of the itemView.
   */
  itemHeight: 30,

  /* Can be set in extend or passed in options.
   * This can be changed during view lifespan with method virtualSetHeight.
   */
  listHeight: 300,

  /* Can be set in extend or passed in options.
   * This should be a Backbone View for a model.
   */
  itemView: null,

  /**
   * This property is wrapped in extend.
   * Your custom events will be merged with this.
   */
  events: {
    /* Basic event required for view to work. */
    scroll: 'virtualScroll'
  },

  /**
   * This method is wrapped in extend.
   * Your custom render will be merged with this.
   *
   * Prepares cache, default values, sets up listeners.
   */
  initialize: function(options) {
    setOption(this, options, 'itemHeight');
    setOption(this, options, 'listHeight');
    setOption(this, options, 'itemView');

    this.__firstVisibleIndex = 0;
    this.__cache = new ItemViewCache();
    this.__expander = null;

    this
      .listenTo(this.collection, 'remove', this.virtualRemoveItem)
      .listenTo(this.collection, 'add', this.virtualSyncList)
      .listenTo(this.collection, 'reset sort', this.virtualReset);
  },

  /**
   * This method is wrapped in extend.
   * Your custom render will be merged with this.
   *
   * Prepares the view and renders items in the viewport.
   */
  render: function() {
    this.virtualExpanderRemove();
    this.$el.addClass('c-virtual-list').height(this.listHeight);
    this.virtualExpanderSet();
    this.$el.html(this.__expander);
    this.virtualScroll();

    /* Setting scroll usually requires the element to be in DOM already. */
    setTimeout(this.setCustomScroll.bind(this), 1);

    return this;
  },

  /**
   * This method is wrapped in extend.
   * Your custom render will be merged with this.
   *
   * Cleans up view to avoid memory leaks.
   */
  remove: function() {
    this.__cache.removeAll();
    this.removeCustomScroll();
    this.virtualExpanderRemove();
    Backbone.View.prototype.remove.apply(this, arguments);
  }

};
