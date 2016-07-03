
(function () {
    'use strict'
    angular.module('myApp', ['ui.router', 'ngMaterial'])
    .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'src/views/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'login',
                })
                .state('signUp', {
                    url: '/signUp',
                    templateUrl: 'src/views/signUp.html',
                    controller: 'signUpCtrl',
                    controllerAs: 'signUp',
                })
                .state('todoLists', {
                    url: '/todoLists',
                    templateUrl: 'src/views/todoLists.html',
                    controller: 'todoListsCtrl',
                    controllerAs: 'todoList',
                })
                .state('todoLists.list', {
                    url:'/list',
                    templateUrl: 'src/views/list.html',
                    controller: 'todoCtrl',
                    controllerAs: 'todos',
                }) 
                .state('error', {
                    url: '/error',
                    templateUrl: 'src/views/error.html',
                    controller: 'errorCtrl',
                })
    })
    .run(function(todos, oAuth, $rootScope, $location) {
        Parse.initialize('keyitup', 'unused');
        Parse.serverURL = 'http://localhost:1337/parse';

        $rootScope.$on( "$locationChangeStart", function(event, next, current) {
            let isAuth = oAuth.isAuthenticated();
            console.log('isAuth', isAuth)
            if(!isAuth || isAuth === "null") {
                console.log('not logged in')
                $location.path('/home');
            } else {
                console.log('logged in')
            }
        });
    })

 })();   
