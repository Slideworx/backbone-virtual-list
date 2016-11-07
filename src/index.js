var Backbone = require('backbone');
var extend = require('./utils/extend');
var partials = require('./partials');
require('./style.scss');

var VirtuaListView = Backbone.View.extend(partials);

VirtuaListView.extend = extend;

module.exports = VirtuaListView;
