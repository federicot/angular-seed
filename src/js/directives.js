'use strict';

/* Directives */
angular.module('myapp.directives', [])
.directive('appVersion', ['version', function(version) {
    return function(scope, elm) {
        elm.text(version);
    };
}])
;
