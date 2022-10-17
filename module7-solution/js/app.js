(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  .filter('TotalPrice', TotalPriceFilterFactory);

  function TotalPriceFilterFactory() {
    return function (pricePerItem, quantity) {
      var currencySymbol = '$$$';
      var totalPrice = quantity * pricePerItem;
      return currencySymbol + totalPrice.toFixed(2);
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      {
        name: "Cookies",
        quantity: 10,
        pricePerItem: 0.50
      },
      {
        name: "Chips",
        quantity: 5,
        pricePerItem: 1.50
      },
      {
        name: "Cereal",
        quantity: 3,
        pricePerItem: 2.50
      },
      {
        name: "Apples",
        quantity: 10,
        pricePerItem: 0.60
      },
      {
        name: "Oranges",
        quantity: 20,
        pricePerItem: 0.75
      }
    ];

    var boughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.removeToBuyItem = function(index) {
      var item = toBuyItems.splice(index, 1);
      boughtItems.push(item[0]);
    };

    service.getBoughtItems = function() {
      return boughtItems;
    };
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyList.removeItem = function(index) {
      ShoppingListCheckOffService.removeToBuyItem(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }
})();