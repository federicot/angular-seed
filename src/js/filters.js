'use strict';

/* Filters */
angular.module('myapp.filters', [])
.filter('test', [function() {
    return function(string) {
        return string;
    };
}])
;
