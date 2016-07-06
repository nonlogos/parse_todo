
(function () {
    'use strict'
    angular.module('myApp', ['ui.router', 'ngMaterial', 'ngStorage'])
    .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'src/views/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'login',
                })
                .state('signup', {
                    url: '/signup',
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

        $rootScope.$on( "$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            let isAuth = oAuth.isAuthenticated();
            console.log('toState', toState.name)
            console.log('fromstate', fromState.name)
            console.log('isAuth', isAuth)
            if(toState.name === 'signup' || fromState.name === 'signup' || toState.name === 'error' || fromState.name === 'error') {
                console.log('working')
                $location.path(toState.name);
            } else if(!isAuth || isAuth === "null" ) {
                console.log('not logged in')
                $location.path('/home');
            } 
        });
    })

 })();   
