(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to Home if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })

      .state('categories', {
        url: '/categories',
        templateUrl: 'categories.html',
        controller: 'CategoriesController as categoriesCtrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      
      .state('categories.items', {
        url: '/items/{shortName}',
        templateUrl: 'items.html',
        controller: 'ItemsController as itemsCtrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.shortName).then(function(menuData) {
              return menuData.menu_items;
            });
          }]
        }
      });
  }
})();
