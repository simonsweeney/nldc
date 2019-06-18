var $ = require('jquery');

$.expr.filters.offscreen = function(el) {
  var rect = el.getBoundingClientRect();
  return (
           (rect.left + rect.width) < 0 
             || (rect.top + rect.height) < 0
             || (rect.left > window.innerWidth || rect.top > window.innerHeight)
         );
};

$.fn.$$ = function(){
    return this.toArray().map( element => $(element) );
}