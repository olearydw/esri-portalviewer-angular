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
  

  




}]);