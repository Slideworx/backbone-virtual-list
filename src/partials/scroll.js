function getHiddenIndexes(lastStartIndex, newStartIndex, itemCount) {
  if (newStartIndex < lastStartIndex) {
    return [newStartIndex + itemCount, lastStartIndex + itemCount];
  }
  return [lastStartIndex, newStartIndex];
}

module.exports = {

  /**
   * Calculates first visible index in the viewport.
   */
  virtualGetFirstVisibleIndex: function() {
    return Math.floor(this.el.scrollTop / this.itemHeight);
  },

  /**
   * Scrolls the list, showing item views that are in the viewport plus 3 items outside.
   */
  virtualScroll: function() {
    var startIndex = Math.max(0, this.virtualGetFirstVisibleIndex() - 3);
    var count = Math.floor(this.listHeight / this.itemHeight) + 6;
    var endIndex = Math.min(this.collection.length, startIndex + count);
    this.virtualHideItems(startIndex, count);
    this.virtualShowItems(startIndex, endIndex);
  },

  /**
   * Marks the items outside the viewport for debounced removal.
   */
  virtualHideItems: function(startIndex, count) {
    var indexes = getHiddenIndexes(this.__firstVisibleIndex, startIndex, count);
    if (indexes[0] !== indexes[1]) {
      for (var index = indexes[0]; index <= indexes[1]; index++) {
        var model = this.collection.models[index];
        if (typeof model === 'undefined') {
          continue;
        }
        this.__cache.hide(model);
      }
    }
    this.__firstVisibleIndex = startIndex;
    this.__cache.debouncedRemove();
  },

  /**
   * Displays items in the viewport.
   * If the item is cached, just shows it.
   * Otherwise, creates new Backbone View for the model.
   */
  virtualShowItems: function(startIndex, endIndex) {
    var elements = [];
    for (var index = startIndex; index < endIndex; index++) {
      var view = this.__cache.show(this.collection.models[index]) || this.virtualGetView(index);
      view.$el.css('top', index * this.itemHeight).addClass('c-virtual-list__item');
      elements.push(view.el);
    }
    var fragment = document.createDocumentFragment();
    for (index = 0; index < elements.length; index++) {
      fragment.appendChild(elements[index]);
    }
    this.el.appendChild(fragment);
  }

};
