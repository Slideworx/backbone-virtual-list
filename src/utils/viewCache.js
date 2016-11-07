var _ = require('lodash');

function ItemViewCache() {
  this._cache = {};
  this.debouncedRemove = _.debounce(this.removeHidden.bind(this), 300);
}

ItemViewCache.prototype = {
  add: function(view) {
    this._cache[view.model.cid] = view;
    view.__itemViewCacheHidden = false;
  },
  hide: function(model) {
    var view = this._cache[model.cid];
    if (view) {
      view.__itemViewCacheHidden = true;
    }
    return undefined;
  },
  show: function(model) {
    var view = this._cache[model.cid];
    if (view) {
      view.__itemViewCacheHidden = false;
      return view;
    }
    return undefined;
  },
  remove: function(model) {
    var view = this._cache[model.cid];
    if (view) {
      this._cache[model.cid] = null;
      view.remove();
    }
  },
  hideAll: function() {
    var cache = this._cache;
    for (var key in cache) {
      if (cache[key]) {
        cache[key].__itemViewCacheHidden = true;
      }
    }
  },
  removeHidden: function() {
    var cache = this._cache;
    for (var key in cache) {
      if (cache[key] && cache[key].__itemViewCacheHidden) {
        cache[key].remove();
        cache[key] = null;
      }
    }
  },
  removeAll: function() {
    var cache = this._cache;
    for (var key in cache) {
      if (cache[key]) {
        cache[key].remove();
        cache[key] = null;
      }
    }
  }
};

module.exports = ItemViewCache;
