describe('Home Controller', function() {
    var ctrl;
    var scope;

    beforeEach(module('myapp.controllers'));
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();

        ctrl = $controller('HomeCtrl', {$scope: scope});
    }));

    it('should define the title', function() {
        expect(scope.title).toBeDefined();
    });

    it('should set the title', function() {
        expect(scope.title).toEqual('Angular Seed');
    });

});
