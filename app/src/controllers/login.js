angular.module('myApp')
    .controller('loginCtrl', function($scope, $location, oAuth) {
    	$scope.submit = (user) => {
    		oAuth.login(user)
    		.then(function(result) {
    			console.log('constroller isAuth', result)
    		})
    	}
    });