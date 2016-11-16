var $ = require('jquery');
var dataCollection = require('../dataCollection');

$('.js-add').on('click', function() {
  dataCollection.addRows(1);
});

$('.js-add-10').on('click', function() {
  dataCollection.addRows(10);
});

$('.js-add-100').on('click', function() {
  dataCollection.addRows(100);
});

$('.js-add-1000').on('click', function() {
  dataCollection.addRows(1000);
});

$('.js-remove').on('click', function() {
  dataCollection.removeRows(1);
});

$('.js-remove-10').on('click', function() {
  dataCollection.removeRows(10);
});

$('.js-remove-100').on('click', function() {
  dataCollection.removeRows(100);
});

$('.js-remove-1000').on('click', function() {
  dataCollection.removeRows(1000);
});
