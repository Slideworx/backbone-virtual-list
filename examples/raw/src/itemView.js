var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  render: function() {
    this.$el.html(this.model.get('label') + this.model.get('message'));
  }
});
