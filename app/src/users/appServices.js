(function(){
  'use strict';

  angular.module('todos')
         .service('todos', []);

  

    // Promise-based API
    return {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        return $q.when(users);
      }
    };
  }

})();
