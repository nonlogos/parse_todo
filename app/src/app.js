
var app = angular.module('myApp', []);

app.run(function() {
    Parse.initialize('keyapp', 'unused');
    Parse.serverURL = 'http://localhost:1337';

      // var query = new Parse.Query('Todos');
      // console.log("query", query)
      // query.get("vNIIIR5PeB").then(function(objAgain) {
      //   console.log('obj', objAgain);
      // }, function(err) {console.error(err); });

      Parse.Cloud.run('averageStars', { movie: 'The Matrix' }).then(function(ratings) {
  // ratings should be 4.5
        console.log('averageStars', ratings)
});

})

app.controller('todoCtrl', function($scope) {
    $scope.todoList = [];

    $scope.todoAdd = function() {
        $scope.todoList.push({todoText:$scope.todoInput, done:false});
        $scope.todoInput = "";
    };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
        });
    };
});
