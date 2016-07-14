Backbone Virtual List
================

This is an extendable Backbone View, which allows to efficiently display long list of elements by rendering only visible subset.

## Example of use
Simply extend the view, pass item view and two heights (item and list).

```javascript
  module.exports = VirutalList.extend({
    /* View used to render single item in the list */
    itemView: ItemView,

    /* Total height of a single row */
    itemHeight: 34,

    /* Total height of visible area */
    listHeight: 300,
  })
```

## Contributing
One can build package by using `npm run build` command.

## Release History

### 1.0.0 (14.07.2016)
Initial release.
