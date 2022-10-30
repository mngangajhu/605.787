(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("ApiBaseUrl", "https://davids-restaurant.herokuapp.com")
    .directive("foundItems", FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      scope: {
        found: "<",
        onRemove: "&",
      },
      templateUrl: "foundItems.html",
      bindToController: true,
      controller: FoundItemsDirectiveController,
      controllerAs: "foundItemsDirectiveCtrl",
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var foundItemsDirectiveCtrl = this;

    foundItemsDirectiveCtrl.isEmptyList = function () {
      return (
        foundItemsDirectiveCtrl.found &&
        foundItemsDirectiveCtrl.found.length === 0
      );
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBaseUrl"];
  function MenuSearchService($http, ApiBaseUrl) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        url: ApiBaseUrl + "/menu_items.json",
      })
        .then(function (result) {
          var menuItems = result.data.menu_items;
          var foundItems = menuItems.filter(function (item) {
            var search = searchTerm.trim().toLowerCase();
            if (search) {
              var description = item.description.toLowerCase();
              return description.indexOf(search) > -1;
            }
            return false;
          });
          return foundItems;
        })
        .catch(function () {
          console.log("Error: Unable to get menu items.");
        });
    };
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDownCtrl = this;
    narrowItDownCtrl.found = null;
    narrowItDownCtrl.searchTerm = "";

    narrowItDownCtrl.narrowDown = function () {
      MenuSearchService.getMatchedMenuItems(narrowItDownCtrl.searchTerm).then(
        function (result) {
          narrowItDownCtrl.found = result;
        }
      );
    };

    narrowItDownCtrl.removeItem = function (index) {
      narrowItDownCtrl.found.splice(index, 1);
    };
  }
})();
