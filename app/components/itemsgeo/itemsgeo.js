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
  $scope.portal = {};
  $scope.portalUrl = "https://www.arcgis.com";

  $scope.map = {
    center: {
      lng: -40,
      lat: 38
    },
    zoom: 2
  };



  require([
    "dojo/on",
    "esri/map",
    "esri/arcgis/Portal"
  ], function (on, Map, arcgisPortal) {

    /*
    var oldmap = new Map("oldmap", {
      center: [$scope.map.center.lng, $scope.map.center.lat],
      zoom: $scope.map.zoom,
      basemap: "dark-gray"
    });
    */


    var p;
    p = new arcgisPortal.Portal($scope.portalUrl);

    on(p, 'load', function () {
      //console.log('PORTAL OBJ', p);
    });




  });
}]);