var Backbone = require('backbone');
var _ = require('lodash');

module.exports = function extendVirtualList(childViewProperties) {
  /* These three methods will be extended */
  var childInitialize = childViewProperties.initialize;
  var childRender = childViewProperties.render;
  var childRemove = childViewProperties.remove;

  /* Keep reference to parentView */
  var parentView = this;

  /* Standard backbone extend. */
  var childView = Backbone.View.extend.apply(this, arguments);

  /* Merge events. */
  childView.prototype.events = _.extend({}, this.prototype.events, childViewProperties.events);

  /* Merge initialize if child declared it. */
  if (childInitialize && _.isFunction(childInitialize)) {
    childView.prototype.initialize = function initializeWrapper() {
      parentView.prototype.initialize.apply(this, arguments);
      childInitialize.apply(this, arguments);
      return this;
    };
  }

  /* Merge render if child declared it. */
  if (childRender && _.isFunction(childRender)) {
    childView.prototype.render = function renderWrapper() {
      parentView.prototype.render.apply(this, arguments);
      childRender.apply(this, arguments);
      return this;
    };
  }

  /* Merge remove if child declared it. */
  if (childRemove && _.isFunction(childRemove)) {
    childView.prototype.remove = function removeWrapper() {
      parentView.prototype.remove.apply(this, arguments);
      childRemove.apply(this, arguments);
      return this;
    };
  }

  /* Return child view. */
  return childView;
};
