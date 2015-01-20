(function () {

  angular.module('catalog.services', [])

    .factory('productService', ['$http', '$q', '$filter', '$window', function ($http, $q, $filter, $window) {
      var normalize = $filter('normalize');
      var localStorage = $window.localStorage;

      function all() {
        var deferred = $q.defer();

        $http.get('/products.json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }


      function byName(name) {
        name = normalize(name);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (product) {
            return normalize(product.name) === name;
          });

          if (results.length > 0) {
            deferred.resolve(results[0]);
          } else {
            deferred.reject();
          }

        });

        return deferred.promise;
      }

      function byType(type) {
        type = normalize(type);
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (product) {
            return product.type.some(function (t) {
              return normalize(t) === type;
            });
          });

          deferred.resolve(results);
        });

        return deferred.promise;
      }


      function saveComment(product, comment) {
        var comments = getComments(product);

        comments.push(comment);
        localStorage.setItem(product, JSON.stringify(comments));
      }

      function getComments(product) {
        var comments = localStorage.getItem(product);

        if (!comments) {
          comments = [];
        } else {
          comments = JSON.parse(comments);
        }

        return comments;
      }

      return {
        all: all,
        byName: byName,
        byType: byType,
        saveComment: saveComment,
        getComments: getComments
      };

    }]);

})();
