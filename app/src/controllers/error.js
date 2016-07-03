angular.module('myApp')
    .controller('errorCtrl', function($scope, oAuth) {
    	console.log('oAuth error', oAuth.error);
    	$scope.error = oAuth.errorHandling();
    });