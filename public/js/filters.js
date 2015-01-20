(function () {

  angular.module('catalog.filters', [])
    .filter('normalize', function () {
      return function (input) {
          if (!input) return "";

          input = input
                  .replace('♀', 'f')
                  .replace('♂', 'm')
                  .replace(/\W+/g, "");
          return input.toLowerCase();
      };
    })

    .filter('imageify', ['$filter', function ($filter) {
      return function (input) {
        var url = "img/products/" + $filter('normalize')(input) + ".jpg";
        return url;
      };
    }]);

})();
