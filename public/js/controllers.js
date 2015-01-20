(function (_) {

  angular.module('catalog.controllers', [])
    .controller('CatalogController', ['$scope', '$routeParams', 'productService', function ($scope, $routeParams, productService) {
      var type = $routeParams.type;

      if (type) {
        $scope.type = type;

        productService.byType(type).then(function (data) {
          $scope.products = data
          $scope.groupped = partition(data, 4);
        });
      } else {
        productService.all().then(function (data) {
          $scope.products = data;
          $scope.groupped = partition(data, 4);
        });
      }


      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])

    .controller('ProductController', ['$scope', '$routeParams', 'productService', function ($scope, $routeParams, productService) {
      var name = $routeParams.name;
      $scope.product = {};

      productService.byName(name)
      .then(function (data) {
        $scope.product = data;
      });
    }])

    .controller('TabsController', function () {
      this.tab = 1;

      this.selectTab = function (tab) {
        this.tab = tab;
      };
    });

})(_);
