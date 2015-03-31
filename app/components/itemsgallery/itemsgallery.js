'use strict';

angular.module('esri-portal.itemsgallery', [])

.controller('ItemsGalleryCtrl', ['$log', '$scope', 'PortalServicesFactory', function ($log, $scope, PortalServicesFactory) {
  $scope.gallerySnippet = "Web GIS portal";

  $scope.portalObj = {};
  
  $scope.loadItems = function () {
    PortalServicesFactory.getItems().then(function (response) {
      console.log(response);
      //$scope.posts = response.data;
    },
    function (errorResponse) {
      console.log('failure loading items', errorResponse);
    });
  };

  $scope.getPortalSelf = function () {
    var params = { f: 'json' };
    var promise = PortalServicesFactory.getPortalSelf(params);
    promise.then(
      function (response) {
        $scope.portalObj.self = response.data;
        console.log($scope.portalObj.self);
      },
      function (errorResponse) {
        console.log('failure loading items', errorResponse);
      }
    );
  };

  //$scope.loadItems();
  $scope.getPortalSelf();

}]);


