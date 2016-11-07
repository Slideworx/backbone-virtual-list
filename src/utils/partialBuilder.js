module.exports = function partialBuilder(partialsArray, overwriteableProperties) {
  overwriteableProperties = overwriteableProperties || [];

  return partialsArray.reduce(function(definition, partial) {
    Object.keys(partial).forEach(function(key) {
      if (definition.hasOwnProperty(key) && definition[key] !== undefined && overwriteableProperties.indexOf(key) === -1) {
        throw 'Previous partial already defined ' + key;
      }
      definition[key] = partial[key];
    });

    return definition;
  }, {});
};
