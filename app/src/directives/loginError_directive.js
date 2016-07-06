angular.module('myApp')
.directive('loginError', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: '<div class="alertMsg"><h3>{{ errorMsg }}</h3></div>',
  };
});