angular.module('myApp')
    .controller('loginCtrl', function($scope, $location, $localStorage, oAuth) {
    	$scope.errorMsg = false;
    	$scope.submit = (user) => {
    		oAuth.login(user)
    		.then(function(result) {
                $localStorage = result;
                console.log('localstorage', $localStorage)
    		}, function(error){
                user.name = '';
                user.password = '';
    			$scope.errorMsg = error.message;
                $scope.$apply();
            })
    	}
    });