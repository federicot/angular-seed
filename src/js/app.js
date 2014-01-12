'use strict';

// Declare app level module which depends on filters, and services
angular.module('myapp', [
        'ngRoute',
        'ngResource',
        'myapp.filters',
        'myapp.services',
        'myapp.directives',
        'myapp.controllers'
    ]).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

        var Auth = {
            loggedUser: function($q) {
                var defer = $q.defer();
                defer.resolve(true);
                return defer.promise;
            }
        };

        $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            resolve: Auth
        })
        .otherwise({redirectTo: '/'});

        // Interceptor that redirects to /login if any response is 401
        $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
            return {
                'response': function(response) {
                    return response;
                },
                'responseError': function(response) {
                    if(response.status === 401) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);

        $httpProvider.defaults.withCredentials = true;

    }])

    .run([function () {

    }]);
