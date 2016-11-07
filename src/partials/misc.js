module.exports = {

  /* Creates new itemView for model at index. */
  virtualGetView: function(index) {
    var view = new this.itemView({
      model: this.collection.models[index]
    });
    this.__cache.add(view);
    view.render();
    return view;
  },

  /* Forces cache reset. */
  virtualReset: function() {
    this.__cache.removeAll();
    this.virtualSyncList();
  },

  /* Synchornises the view with current collection state. */
  virtualSyncList: function() {
    this.virtualExpanderSync();
    this.virtualScroll();
    this.updateCustomScroll();
  },

  /* Listener for removal of model from collection. */
  virtualRemoveItem: function(model) {
    this.__cache.remove(model);
    this.virtualSyncList();
  },

  /**
   * Allows changing view height.
   */
  virtualSetHeight: function(newHeight) {
    this.listHeight = newHeight;
    this.$el.height(this.listHeight);
    this.updateCustomScroll();
  }

};
