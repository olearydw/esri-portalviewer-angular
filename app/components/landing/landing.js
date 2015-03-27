'use strict';

angular.module('esri-portal.landing', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/landing', {
    templateUrl: 'app/components/landing/landing.html',
    controller: 'LandingPageCtrl'
  });
}])

.controller('LandingPageCtrl', ['$scope', function ($scope) {
  $scope.greeting = "Esri Portal Angular";
}]);