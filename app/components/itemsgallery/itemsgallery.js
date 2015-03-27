'use strict';

angular.module('esri-portal.itemsgallery', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/itemsgallery/', {
    templateUrl: 'app/components/itemsgallery/itemsgallery.html',
    controller: 'ItemsGalleryCtrl'
  });
}])

.controller('ItemsGalleryCtrl', ['$scope', function ($scope) {
  $scope.gallerySnippet = "Web GIS portal";
  $scope.portal = {};
  $scope.portalUrl = "https://www.arcgis.com";

  require([
    "dojo/on",
    "esri/map",
    "esri/arcgis/Portal"
  ], function (on, Map, arcgisPortal) {
    console.log('Esri Stuff', Map, arcgisPortal);
    var map = new Map("map", {
      center: [-40, 30],
      zoom: 2,
      basemap: "dark-gray"
    });
    var p;
    p = new arcgisPortal.Portal($scope.portalUrl);

    on(p, 'load', function () {
      console.log('PORTAL OBJ', p);
    });

  });



}]);