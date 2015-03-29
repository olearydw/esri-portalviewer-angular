'use strict';

angular.module('esri-portal.itemsgallery', [])

.controller('ItemsGalleryCtrl', ['$scope', 'ServicesFactory', function ($scope, ServicesFactory) {
  $scope.gallerySnippet = "Web GIS portal";
  
  $scope.loadItems = function () {

    ServicesFactory.getItems().then(function (response) {
      console.log(response.data);
      //$scope.posts = response.data;
    });




    /*
    var pItems = servicesFactory.getItems().then(function (data) {
      console.log(data);
      return data;
    });
    */
    //console.log(pItems);

    /*
    servicesFactory.getItems().then(function (response) {
      console.log('RESPONSE FROM SERVICE FACTORY', response);
    });
    */


  }();

  //console.log($scope);
  //console.log($rootScope);


  //this.loadItems();


}]);