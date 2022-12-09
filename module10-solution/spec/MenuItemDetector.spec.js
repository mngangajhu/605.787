describe("MenuItemDetector", function() {
  var $controller;
  var MenuService;
  var UserPreferenceService;
  var $httpBackend;
  var SignupController;
  var ApiPath;

  beforeEach(function() {
    module('public');

    inject(function($injector, _$controller_) {
      MenuService = $injector.get('MenuService');
      UserPreferenceService = $injector.get('UserPreferenceService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
      $controller = _$controller_;
    });

    SignupController = $controller('SignupController', {
      MenuService: MenuService,
      UserPreferenceService: UserPreferenceService
    });
  });

  it("should be able to detect invalid menu item", function() {
    var shortName = 'ABCD';
    $httpBackend.whenGET(ApiPath + '/menu_items/' + shortName + '.json')
    .respond(500, '');

    SignupController.checkMenuItem(shortName);
    $httpBackend.flush();
    expect(SignupController.invalidMenuItem).toBe(true);
  });

  it("should be able to detect valid menu item", function() {
    var shortName = 'A1';
    $httpBackend.whenGET(ApiPath + '/menu_items/' + shortName + '.json')
    .respond(200, '');

    SignupController.checkMenuItem(shortName);
    $httpBackend.flush();
    expect(SignupController.invalidMenuItem).toBe(false);
  });
});
