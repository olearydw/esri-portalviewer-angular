'use strict';

angular.module('esri-portal.itemsgeo', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/itemsgeo/itemsgeo.html', {
    templateUrl: 'app/components/itemsgeo/itemsgeo.html',
    controller: 'ItemsGeoCtrl'
  });
}])

.controller('ItemsGeoCtrl', ['$scope', function ($scope) {
  $scope.portalName = "ArcGIS Online";
}]);