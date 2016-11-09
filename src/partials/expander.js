module.exports = {

  /**
   * Sets up a div will expand this.el to have correct height for scroll purposes.
   */
  virtualExpanderSet: function() {
    this.__expander = document.createElement('div');
    this.__expander.className = 'c-virtual-list__expander';
    this.virtualExpanderSync();
  },

  /**
   * When underlying collection changes, update expander height.
   */
  virtualExpanderSync: function() {
    this.__expander.style.height = this.collection.length * this.itemHeight + 'px';
  },

  /**
   * Removes expander when we're about to rerender whole view.
   */
  virtualExpanderRemove: function() {
    if (this.__expander) {
      this.el.removeChild(this.__expander);
      this.__expander = null;
    }
  }

};
