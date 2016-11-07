var partials = [
  require('./base'),
  require('./customScroll'),
  require('./expander'),
  require('./misc'),
  require('./scroll')
];

module.exports = require('../utils/partialBuilder')(partials);
