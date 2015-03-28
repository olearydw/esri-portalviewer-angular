'use strict';

angular.module('esri-portal', [
  'ngRoute',
  'esri-portal.landing',
  'esri-portal.itemsgeo',
  'esri-portal.itemsgallery',
  'esri.map'
]).
config(['$routeProvider', function ($routeProvider) {
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