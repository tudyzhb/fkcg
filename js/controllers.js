'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', function($scope) {
    $scope.name="my name";
  }])
  .controller('MyCtrl2', [function() {

  }]);