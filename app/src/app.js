
(function () {
    'use strict'
    angular.module('myApp', ['ui.router'])
    .run(function(todos) {
            Parse.initialize('keyitup', 'unused');
            Parse.serverURL = 'http://localhost:1337/parse';
        })
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
        });

 })();   
