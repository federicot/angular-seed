module.exports = function(config) {
    config.set({
        files : [
            'src/lib/angular/angular.js',
            'src/lib/angular-mocks/angular-mocks.js',
            'src/lib/angular-route/angular-route.js',
            'src/lib/angular-resource/angular-resource.js',
            'src/js/**/*.js',
            'test/unit/**/*.js'
        ],
        basePath: '../',
        frameworks: ['jasmine'],
        reporters: ['progress'],
        browsers: ['Chrome'],
        autoWatch: false,
        singleRun: false,
        colors: true
    });
};
