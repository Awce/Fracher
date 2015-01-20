(function () {

  angular.module('catalog.directives', [])
    .directive('productName', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/product-name.html'
      };
    })

    .directive('productImage', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/product-image.html'
      };
    })

    .directive('productData', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/product-data.html'
      };
    })

    .directive('productStats', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/product-stats.html'
      };
    })

    .directive('productEvolution', function () {
      return {
        retrict: 'E',
        templateUrl: 'partials/product-evolution.html'
      };
    })

    .directive('productType', function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/product-type.html'
      };
    })

    .directive('productComments', ['productService', function (productService) {
      return {
        restrict: 'E',
        templateUrl: 'partials/product-comments.html',
        scope: {
          name: '@name'
        },
        link: function (scope, element, attributes) {
          attributes.$observe('name', function (value) {
            if (value) {
              scope.name = value;
              scope.comments = productService.getComments(value);
            }
          });
        },
        controller: function ($scope) {
          $scope.comments = productService.getComments($scope.name);
          $scope.comment = {};
          $scope.show = false;

          $scope.toggle = function () {
            $scope.show = !$scope.show;
          };

          $scope.anonymousChanged = function () {
            if ($scope.comment.anonymous) {
              $scope.comment.email = "";
            }
          };

          $scope.addComment = function () {
            $scope.comment.date = Date.now();
            productService.saveComment($scope.name, $scope.comment);
            $scope.comments = productService.getComments($scope.name);
            $scope.comment = {};
          };

        }
      };
    }]);

})();
