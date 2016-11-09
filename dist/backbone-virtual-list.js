define(["backbone","lodash"], function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Backbone = __webpack_require__(1);\r\nvar extend = __webpack_require__(2);\r\nvar partials = __webpack_require__(4);\r\n__webpack_require__(13);\r\n\r\nvar VirtuaListView = Backbone.View.extend(partials);\r\n\r\nVirtuaListView.extend = extend;\r\n\r\nmodule.exports = VirtuaListView;\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/index.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_1__;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"backbone\"\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///external_%22backbone%22?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Backbone = __webpack_require__(1);\r\nvar _ = __webpack_require__(3);\r\n\r\nmodule.exports = function extendVirtualList(childViewProperties) {\r\n  /* These three methods will be extended */\r\n  var childInitialize = childViewProperties.initialize;\r\n  var childRender = childViewProperties.render;\r\n  var childRemove = childViewProperties.remove;\r\n\r\n  /* Keep reference to parentView */\r\n  var parentView = this;\r\n\r\n  /* Standard backbone extend. */\r\n  var childView = Backbone.View.extend.apply(this, arguments);\r\n\r\n  /* Merge events. */\r\n  childView.prototype.events = _.extend({}, this.prototype.events, childViewProperties.events);\r\n\r\n  /* Merge initialize if child declared it. */\r\n  if (childInitialize && _.isFunction(childInitialize)) {\r\n    childView.prototype.initialize = function initializeWrapper() {\r\n      parentView.prototype.initialize.apply(this, arguments);\r\n      childInitialize.apply(this, arguments);\r\n      return this;\r\n    };\r\n  }\r\n\r\n  /* Merge render if child declared it. */\r\n  if (childRender && _.isFunction(childRender)) {\r\n    childView.prototype.render = function renderWrapper() {\r\n      parentView.prototype.render.apply(this, arguments);\r\n      childRender.apply(this, arguments);\r\n      return this;\r\n    };\r\n  }\r\n\r\n  /* Merge remove if child declared it. */\r\n  if (childRemove && _.isFunction(childRemove)) {\r\n    childView.prototype.remove = function removeWrapper() {\r\n      parentView.prototype.remove.apply(this, arguments);\r\n      childRemove.apply(this, arguments);\r\n      return this;\r\n    };\r\n  }\r\n\r\n  /* Return child view. */\r\n  return childView;\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/extend.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/extend.js?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_3__;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"lodash\"\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("var partials = [\r\n  __webpack_require__(5),\r\n  __webpack_require__(8),\r\n  __webpack_require__(9),\r\n  __webpack_require__(10),\r\n  __webpack_require__(11)\r\n];\r\n\r\nmodule.exports = __webpack_require__(12)(partials);\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/partials/index.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./src/partials/index.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Backbone = __webpack_require__(1);\r\nvar ItemViewCache = __webpack_require__(6);\r\nvar setOption = __webpack_require__(7);\r\n\r\nmodule.exports = {\r\n\r\n  /* Can be set in extend or passed in options.\r\n   * This is the height of the itemView.\r\n   */\r\n  itemHeight: 30,\r\n\r\n  /* Can be set in extend or passed in options.\r\n   * This can be changed during view lifespan with method virtualSetHeight.\r\n   */\r\n  listHeight: 300,\r\n\r\n  /* Can be set in extend or passed in options.\r\n   * This should be a Backbone View for a model.\r\n   */\r\n  itemView: null,\r\n\r\n  /**\r\n   * This property is wrapped in extend.\r\n   * Your custom events will be merged with this.\r\n   */\r\n  events: {\r\n    /* Basic event required for view to work. */\r\n    scroll: 'virtualScroll'\r\n  },\r\n\r\n  /**\r\n   * This method is wrapped in extend.\r\n   * Your custom render will be merged with this.\r\n   *\r\n   * Prepares cache, default values, sets up listeners.\r\n   */\r\n  initialize: function(options) {\r\n    setOption(this, options, 'itemHeight');\r\n    setOption(this, options, 'listHeight');\r\n    setOption(this, options, 'itemView');\r\n\r\n    this.__firstVisibleIndex = 0;\r\n    this.__cache = new ItemViewCache();\r\n    this.__expander = null;\r\n\r\n    this\r\n      .listenTo(this.collection, 'remove', this.virtualRemoveItem)\r\n      .listenTo(this.collection, 'add', this.virtualSyncList)\r\n      .listenTo(this.collection, 'reset sort', this.virtualReset);\r\n  },\r\n\r\n  /**\r\n   * This method is wrapped in extend.\r\n   * Your custom render will be merged with this.\r\n   *\r\n   * Prepares the view and renders items in the viewport.\r\n   */\r\n  render: function() {\r\n    this.virtualExpanderRemove();\r\n    this.$el.addClass('c-virtual-list').height(this.listHeight);\r\n    this.virtualExpanderSet();\r\n    this.$el.html(this.__expander);\r\n    this.virtualScroll();\r\n\r\n    /* Setting scroll usually requires the element to be in DOM already. */\r\n    setTimeout(this.setCustomScroll.bind(this), 1);\r\n\r\n    return this;\r\n  },\r\n\r\n  /**\r\n   * This method is wrapped in extend.\r\n   * Your custom render will be merged with this.\r\n   *\r\n   * Cleans up view to avoid memory leaks.\r\n   */\r\n  remove: function() {\r\n    this.__cache.removeAll();\r\n    this.removeCustomScroll();\r\n    this.virtualExpanderRemove();\r\n    Backbone.View.prototype.remove.apply(this, arguments);\r\n  }\r\n\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/partials/base.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./src/partials/base.js?");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("var _ = __webpack_require__(3);\r\n\r\nfunction ItemViewCache() {\r\n  this._cache = {};\r\n  this.debouncedRemove = _.debounce(this.removeHidden.bind(this), 300);\r\n}\r\n\r\nItemViewCache.prototype = {\r\n  add: function(view) {\r\n    this._cache[view.model.cid] = view;\r\n    view.__itemViewCacheHidden = false;\r\n  },\r\n  hide: function(model) {\r\n    var view = this._cache[model.cid];\r\n    if (view) {\r\n      view.__itemViewCacheHidden = true;\r\n    }\r\n    return undefined;\r\n  },\r\n  show: function(model) {\r\n    var view = this._cache[model.cid];\n    if (view) {\r\n      view.__itemViewCacheHidden = false;\r\n      return view;\r\n    }\r\n    return undefined;\r\n  },\r\n  remove: function(model) {\r\n    var view = this._cache[model.cid];\r\n    if (view) {\r\n      this._cache[model.cid] = null;\r\n      view.remove();\r\n    }\r\n  },\r\n  hideAll: function() {\r\n    var cache = this._cache;\r\n    for (var key in cache) {\r\n      if (cache[key]) {\r\n        cache[key].__itemViewCacheHidden = true;\r\n      }\r\n    }\r\n  },\r\n  removeHidden: function() {\r\n    var cache = this._cache;\r\n    for (var key in cache) {\r\n      if (cache[key] && cache[key].__itemViewCacheHidden) {\r\n        cache[key].remove();\r\n        cache[key] = null;\r\n      }\r\n    }\r\n  },\r\n  removeAll: function() {\r\n    var cache = this._cache;\r\n    for (var key in cache) {\r\n      if (cache[key]) {\r\n        cache[key].remove();\r\n        cache[key] = null;\r\n      }\r\n    }\r\n  }\r\n};\r\n\r\nmodule.exports = ItemViewCache;\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/viewCache.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/viewCache.js?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("module.exports = function setOption(instance, options, optionName) {\r\n  if (!options) {\r\n    return;\r\n  }\r\n  if (options[optionName]) {\r\n    instance[optionName] = options[optionName];\r\n  }\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/setOption.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/setOption.js?");

/***/ },
/* 8 */
/***/ function(module, exports) {

	eval("module.exports = {\r\n\r\n  /**\r\n   * If You're using custom scroll, overwrite this function with Your custom scroll setup.\r\n   */\r\n  setCustomScroll: function() {},\r\n\r\n  /**\r\n   * If You're using custom scroll, overwrite this function with Your custom scroll update when items collection changes.\r\n   */\r\n  updateCustomScroll: function() {},\r\n\r\n  /**\r\n   * If You're using custom scroll, overwrite this function with Your custom scroll removal.\r\n   */\r\n  removeCustomScroll: function() {}\r\n\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/partials/customScroll.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/partials/customScroll.js?");

/***/ },
/* 9 */
/***/ function(module, exports) {

	eval("module.exports = {\r\n\r\n  /**\r\n   * Sets up a div will expand this.el to have correct height for scroll purposes.\r\n   */\r\n  virtualExpanderSet: function() {\r\n    this.__expander = document.createElement('div');\r\n    this.__expander.className = 'c-virtual-list__expander';\r\n    this.virtualExpanderSync();\r\n  },\r\n\r\n  /**\r\n   * When underlying collection changes, update expander height.\r\n   */\r\n  virtualExpanderSync: function() {\r\n    this.__expander.style.height = this.collection.length * this.itemHeight + 'px';\r\n  },\r\n\r\n  /**\r\n   * Removes expander when we're about to rerender whole view.\r\n   */\r\n  virtualExpanderRemove: function() {\r\n    if (this.__expander) {\r\n      this.el.removeChild(this.__expander);\r\n      this.__expander = null;\r\n    }\r\n  }\r\n\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/partials/expander.js\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///./src/partials/expander.js?");

/***/ },
/* 10 */
/***/ function(module, exports) {

	eval("module.exports = {\r\n\r\n  /* Creates new itemView for model at index. */\r\n  virtualGetView: function(index) {\r\n    var view = new this.itemView({\r\n      model: this.collection.models[index]\r\n    });\r\n    this.__cache.add(view);\r\n    view.render();\r\n    return view;\r\n  },\r\n\r\n  /* Forces cache reset. */\r\n  virtualReset: function() {\r\n    this.__cache.removeAll();\r\n    this.virtualSyncList();\r\n  },\r\n\r\n  /* Synchornises the view with current collection state. */\r\n  virtualSyncList: function() {\r\n    this.virtualExpanderSync();\r\n    this.virtualScroll();\r\n    this.updateCustomScroll();\r\n  },\r\n\r\n  /* Listener for removal of model from collection. */\r\n  virtualRemoveItem: function(model) {\r\n    this.__cache.remove(model);\r\n    this.virtualSyncList();\r\n  },\r\n\r\n  /**\r\n   * Allows changing view height.\r\n   */\r\n  virtualSetHeight: function(newHeight) {\r\n    this.listHeight = newHeight;\r\n    this.$el.height(this.listHeight);\r\n    this.updateCustomScroll();\r\n  }\r\n\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/partials/misc.js\n// module id = 10\n// module chunks = 0\n//# sourceURL=webpack:///./src/partials/misc.js?");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("function getHiddenIndexes(lastStartIndex, newStartIndex, itemCount) {\r\n  if (newStartIndex < lastStartIndex) {\r\n    return [newStartIndex + itemCount, lastStartIndex + itemCount];\r\n  }\r\n  return [lastStartIndex, newStartIndex];\r\n}\r\n\r\nmodule.exports = {\r\n\r\n  /**\r\n   * Scrolls the list, showing item views that are in the viewport plus 3 items outside.\r\n   */\r\n  virtualScroll: function() {\r\n    var startIndex = Math.max(0, Math.floor(this.el.scrollTop / this.itemHeight) - 3);\r\n    var count = Math.floor(this.listHeight / this.itemHeight) + 6;\r\n    var endIndex = Math.min(this.collection.length, startIndex + count);\r\n    this.virtualHideItems(startIndex, count);\r\n    this.virtualShowItems(startIndex, endIndex);\r\n  },\r\n\r\n  /**\r\n   * Marks the items outside the viewport for debounced removal.\r\n   */\r\n  virtualHideItems: function(startIndex, count) {\r\n    var indexes = getHiddenIndexes(this.__firstVisibleIndex, startIndex, count);\r\n    if (indexes[0] !== indexes[1]) {\r\n      for (var index = indexes[0]; index <= indexes[1]; index++) {\r\n        var model = this.collection.models[index];\r\n        if (typeof model === 'undefined') {\r\n          continue;\r\n        }\r\n        this.__cache.hide(model);\r\n      }\r\n    }\r\n    this.__firstVisibleIndex = startIndex;\r\n    this.__cache.debouncedRemove();\r\n  },\r\n\r\n  /**\r\n   * Displays items in the viewport.\r\n   * If the item is cached, just shows it.\r\n   * Otherwise, creates new Backbone View for the model.\r\n   */\r\n  virtualShowItems: function(startIndex, endIndex) {\r\n    var elements = [];\r\n    for (var index = startIndex; index < endIndex; index++) {\r\n      var view = this.__cache.show(this.collection.models[index]) || this.virtualGetView(index);\r\n      view.$el.css('top', index * this.itemHeight).addClass('c-virtual-list__item');\r\n      elements.push(view.el);\r\n    }\r\n    var fragment = document.createDocumentFragment();\r\n    for (index = 0; index < elements.length; index++) {\r\n      fragment.appendChild(elements[index]);\r\n    }\r\n    this.el.appendChild(fragment);\r\n  }\r\n\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/partials/scroll.js\n// module id = 11\n// module chunks = 0\n//# sourceURL=webpack:///./src/partials/scroll.js?");

/***/ },
/* 12 */
/***/ function(module, exports) {

	eval("module.exports = function partialBuilder(partialsArray, overwriteableProperties) {\r\n  overwriteableProperties = overwriteableProperties || [];\r\n\r\n  return partialsArray.reduce(function(definition, partial) {\r\n    Object.keys(partial).forEach(function(key) {\r\n      if (definition.hasOwnProperty(key) && definition[key] !== undefined && overwriteableProperties.indexOf(key) === -1) {\r\n        throw 'Previous partial already defined ' + key;\r\n      }\r\n      definition[key] = partial[key];\r\n    });\r\n\r\n    return definition;\r\n  }, {});\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/partialBuilder.js\n// module id = 12\n// module chunks = 0\n//# sourceURL=webpack:///./src/utils/partialBuilder.js?");

/***/ },
/* 13 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/style.scss\n// module id = 13\n// module chunks = 0\n//# sourceURL=webpack:///./src/style.scss?");

/***/ }
/******/ ])});;