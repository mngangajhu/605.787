(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope) {
    $scope.items = "";
    $scope.message = "";
    $scope.success = false;
    $scope.error = false;

    $scope.checkLunch = function () {
      var items = $scope.items.split(",").filter(function (item) {
        return item.trim().length > 0;
      });

      var length = items.length;
      $scope.success = length > 0;
      $scope.error = !$scope.success;

      if (length) {
        if (length <= 3) {
          $scope.message = "Enjoy!";
        } else {
          $scope.message = "Too much!";
        }
      } else {
        $scope.message = "Please enter data first";
      }
    };
  }
})();
