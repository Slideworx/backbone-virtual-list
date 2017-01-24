var Backbone = require('backbone');
require('./style.scss');

module.exports = Backbone.View.extend({
  className: 'm-item-view',

  render: function() {
    this.$el.html('<span>' + this.model.get('label') + '</span><span>' + this.model.get('message') + '</span>');
  }
});
