(function () {
  "use strict";
  
  angular.module('common')
  .service('UserPreferenceService', UserPreferenceService);
  
  
  UserPreferenceService.$inject = [];
  function UserPreferenceService() {
    var service = this;
    var preferences;
  
    service.getUserPreferences = function () {
      return preferences;
    };
  
  
    service.setUserPreferences = function (userPreferences) {
      preferences = userPreferences;
    };
  }
  
  })();
  