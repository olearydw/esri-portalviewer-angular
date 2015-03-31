'use strict';

var app = angular.module('esri-portal', [
  'ngRoute',
  'esri-portal.landing',
  'esri-portal.itemsgeo',
  'esri-portal.itemsgallery',
  'esri-portal.services',
  'esri.map'
]);

require([
  "dojo/on",
  "esri/map",
  "esri/arcgis/Portal",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol"
], function (on, map, arcgisPortal, SimpleMarkerSymbol, SimpleLineSymbol) {
  //console.log(arcgisPortal);
  angular.bootstrap(document.body, ['esri-portal']);
});



app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'app/components/landing/landing.html'
    })
    .when('/landing', {
      controller: 'LandingPageCtrl',
      templateUrl: 'app/components/landing/landing.html'
    })
    .when('/itemsgeo/', {
      controller: 'ItemsGeoCtrl',
      templateUrl: 'app/components/itemsgeo/itemsgeo.html'
    })
    .when('/itemsgallery/', {
      controller: 'ItemsGalleryCtrl',
      templateUrl: 'app/components/itemsgallery/itemsgallery.html'
    })
    .otherwise({ redirectTo: '/' });
}]);