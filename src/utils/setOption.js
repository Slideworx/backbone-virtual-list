module.exports = function setOption(instance, options, optionName) {
  if (!options) {
    return;
  }
  if (options[optionName]) {
    instance[optionName] = options[optionName];
  }
};
