'use strict';

angular.module('myApp')
    .controller('signUpCtrl', function($scope, oAuth) {
    	$scope.master = {};
    	$scope.submit = (user) => {
    		console.log('user', user)
    		oAuth.signUp(user);
    	}
    });