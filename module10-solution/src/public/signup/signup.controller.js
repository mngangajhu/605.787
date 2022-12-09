(function () {
  'use strict';

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', 'UserPreferenceService'];
  function SignupController(MenuService, UserPreferenceService) {
    var ctrl = this;
    ctrl.user = {};
    ctrl.invalidMenuItem = false;
    ctrl.saved = false;

    ctrl.checkMenuItem = function (shortName) {
      return MenuService.getMenuItem(shortName)
      .then(function () {
        ctrl.invalidMenuItem = false;
      }).catch(function () {
        ctrl.invalidMenuItem = true;
      });
    };

    ctrl.submit = function (form) {
      ctrl.checkMenuItem(ctrl.user.favDish)
      .then(function () {
        UserPreferenceService.setUserPreferences(ctrl.user);
        ctrl.saved = true;
        form.$setPristine();
      }).catch(function () {
        ctrl.saved = false;
      });
    };
  }
}) ()
