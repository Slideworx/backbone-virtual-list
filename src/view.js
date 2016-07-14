var Backbone = require('backbone');
var debounce = require('lodash').debounce;

module.exports = Backbone.View.extend({
  itemHeight: 30,
  listHeight: 300,
  itemView: null,

  events: {
    scroll: 'updateItems'
  },

  initialize: function() {
    this._lastStartIndex = 0;
    this._dict = {};
    this.removeItemsDebounced = debounce(this.removeItems, 300);

    this.listenTo(this.collection, 'remove', this.syncRemovedItem);
    this.listenTo(this.collection, 'add', this.syncAddedItem);
  },

  render: function() {
    this.$el.addClass('virtual-list').html(this.getScroller());
    this.updateItems();

    return this;
  },

  getScroller: function() {
    var scrollerElement = document.createElement('div');
    scrollerElement.className = 'virtual-list__scroller';
    scrollerElement.style.height = this.collection.length * this.itemHeight + 'px';
    return scrollerElement;
  },

  updateScroller: function() {
    this.$('.virtual-list__scroller').css('height', this.collection.length * this.itemHeight);
  },

  /* @TODO Not very efficient, needs some cleanup. */
  updateItemHeight: function(newItemHeight) {
    this.itemHeight = newItemHeight;
    this.updateScroller();
    var dict = this._dict;
    for (var key in dict) {
      if (dict[key]) {
        dict[key].__virtualListHidden = true;
      }
    }
    this.updateItems();
    this.removeItems();
  },

  updateItems: function() {
    var startIndex = Math.max(0, Math.floor(this.el.scrollTop / this.itemHeight) - 3);
    var count = Math.floor(this.listHeight / this.itemHeight) + 6;
    var endIndex = Math.min(this.collection.length, startIndex + count);
    this.hideItems(startIndex, count);
    this.showItems(startIndex, endIndex);
    this.removeItemsDebounced();
  },

  getHiddenIndexes: function(startIndex, count) {
    if (startIndex < this._lastStartIndex) {
      return [startIndex + count, this._lastStartIndex + count];
    }
    return [this._lastStartIndex, startIndex];
  },

  hideItems: function(startIndex, count) {
    var indexes = this.getHiddenIndexes(startIndex, count);
    if (indexes[0] !== indexes[1]) {
      for (var i = indexes[0]; i <= indexes[1]; i++) {
        var item = this.collection.at(i);
        if (typeof item === 'undefined') {
          continue;
        }
        var view = this._dict[item.cid];
        if (view) {
          view.__virtualListHidden = true;
        }
      }
    }
    this._lastStartIndex = startIndex;
  },

  getView: function(index) {
    var cachedView = this._dict[this.collection.at(index).cid];
    if (cachedView) {
      cachedView.__virtualListHidden = false;
      return cachedView;
    }
    return this.getNewView(index);
  },

  getNewView: function(index) {
    var view = new this.itemView({
      model: this.collection.models[index]
    });
    this._dict[this.collection.at(index).cid] = view;
    view.render();
    return view;
  },

  showItems: function(startIndex, endIndex) {
    var elements = [];
    for (var i = startIndex; i < endIndex; i++) {
      var view = this.getView(i);
      view.$el
        .css({
          position: 'absolute',
          top: i * this.itemHeight
        }).addClass('virtual-list__item');
      elements.push(view.el);
    }
    var fragment = document.createDocumentFragment();
    for (i = 0; i < elements.length; i++) {
      fragment.appendChild(elements[i]);
    }
    this.el.appendChild(fragment);
  },

  removeItems: function() {
    var dict = this._dict;
    for (var key in dict) {
      if (dict[key] && dict[key].__virtualListHidden) {
        dict[key].remove();
        dict[key] = null;
      }
    }
  },

  syncRemovedItem: function(model) {
    this._dict[model.cid].__virtualListHidden = true;
    this.updateScroller();
    this.removeItems();
    this.updateItems();
  },

  syncAddedItem: function() {
    this.updateScroller();
    this.updateItems();
  }
});
