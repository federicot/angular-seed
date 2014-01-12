describe('Home Page', function() {

    beforeEach(function() {
        browser.get('#/');
    });

    it('should load the login page', function() {
        expect($('h1').getText()).toBe('Angular Seed');
    });

});
