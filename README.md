Backbone Virtual List
================

This is an extendable Backbone View, which allows to efficiently display long list of elements by rendering only visible subset.

## Requirements
Library uses external dependencies: `lodash`, `backbone` and `jquery`. Make sure these are available through `require`.

## Example of usage
You can create an instance of VirtualList:

```javascript
  var instance = new VirtualList({
    /* View used to render single item in the list */
    itemView: ItemView,

    /* Total height of a single row */
    itemHeight: 34,

    /* Total height of visible area */
    listHeight: 300,

    /* Collection of models that will be rendered. */
    collection: collection
  });
```

## Example of extending
You can extend VirtualList with Your settings, as in example below.

```javascript
  var MyVirtualList = VirutalList.extend({
    /* View used to render single item in the list */
    itemView: ItemView,

    /* Total height of a single row */
    itemHeight: 34,

    /* Total height of visible area */
    listHeight: 300,
  });
```

Next, create instance of Your extended view. In view options, pass a collection of models, that will be use to render itemViews.
```javascript
var instance  = new MyVirtualList({ collection: myCustomCollection });
instance.render();
instance.appendTo(this.$el);
```

## ItemView
ItemView must be a class (unless You're overwriting `virtualGetView`, then whatever you want). Additionally, it must provide method `remove` that will be called to remove the view from the DOM and cleanup.
For each ItemView, a private property `__itemViewCacheHidden` is set to track its state of visibility.

## Usage with filters
The list will refresh when the collection will be reseted, sorted, items are added or removed.
However, list will display all the items in collection, so marking them with some attribute will not work.
You need some cache (for example another collection) that will have all the items, and the collection passed to list will reset on filter with only filtered items.

## Custom scroll
You'll probably want to use custom scroll. In that case, while extending the list, You have to specify methods: `setCustomScroll`, `updateCustomScroll`, `removeCustomScroll`.
These methods will be automatically called when needed. Additionaly, if Your scroll doesn't set scrollTop on the VirtualListView element, method `virtualGetFirstVisibleIndex` can now be overwritten to provide custom logic for calculating first visible index. This method can return negative numbers, but must always return a number.

## Base view methods
Methods: `initialize`, `render`, `remove` are wrapped in extend, so You can just write Your own methods without worry that You'll overwrite some custom logic.

Methods `virtualExpanderSet`, `virtualExpanderSync`, `virtualExpanderRemove`,  `virtualScroll`, `virtualHideItems`, `virtualShowItems`, `virtualReset`, `virtualSyncList` , `virtualRemoveItem` are used in setup of the view, and should not be overwritten.

## Usable methods
`virtualSetHeight` is used to set the current height of the view, in case the container height has changed. Just pass the new height of the virtual list.

`virtualGetView` is method used to generate the itemView for the model. You can overwrite it to provide custom logic, however keep in mind that it's fired for every visible model and should add the view to cache.
