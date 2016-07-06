(() => {
  'use strict';

  angular.module('myApp')
         .factory('oAuth', function($window, $location) {

        let oAuthError;

		const signUp = userRecord => {
			const name = userRecord.name;
			const password = userRecord.password;
			const email = userRecord.email;
			return Parse.User.signUp(name, password, {email: email})
			.then(function(result) {
				$window.location.href= '#/todoLists/list'
			}, function(error){
				console.log('error', error)
				oAuthError = error.message;
				$window.location.href='#/error';
			})
		}  

		const login = userRecord => {
			console.log('isAuth user', userRecord);
			const name = userRecord.name;
			const password = userRecord.password; 
			return Parse.User.logIn(name, password)
			.then(function(result) {
				console.log('login success', result)
				$window.location.href= '#/todoLists/list'
				return result;
			}, function(error) {
				console.error(error);
				return error;
			})

		}

		const isAuthenticated = () => {
			let isAuth = JSON.stringify(Parse.User.current());
			return isAuth;
		}	


	    const signOut = () => {
	      return Parse.User.logOut()
	      .then(function(response) {
	      	console.log('signOut result', response);
	      	$window.location.href="#/home";
	      }, function(error) {
	      	console.error(error)
	      })
	    }


		const errorHandling = () => {
			return oAuthError;
		}
    
    return {
      signUp: signUp,
      login: login,
      isAuthenticated: isAuthenticated,
      signOut: signOut,
      errorHandling: errorHandling,
    };      

  });

})();


 

