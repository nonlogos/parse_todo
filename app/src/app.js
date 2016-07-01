
var app = angular.module('myApp', []);

app.run(function(todos) {
    Parse.initialize('keyitup', 'unused');
    Parse.serverURL = 'http://localhost:1337/parse';
});

app.controller('todoCtrl', function($scope, todos, $timeout) {
    $scope.todoList = [];
    
    $scope.todoAdd = function() {
        var newTodo = $scope.todoInput;
        todos.addTodos(newTodo)
        .then(function(result) {
            $scope.todoList[0].id = result.id;

        });

        $scope.todoList.unshift({todoText: newTodo});

        $scope.todoInput = "";
    };

    //function to keep track of checked state of todo item
    $scope.saveToggleState = function() {
        var done = this.x.done;
        var id = this.x.id;
        todos.saveStatus(id, done);
    };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        var deletedList =[];
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
            else deletedList.push(x);
            todos.deleteTodos(deletedList);
        });
    };
    
    this.$onInit = function() {
        todos.getTodos()
        .then(function(todoResponse){
            $timeout(function(){
                $scope.todoList = todoResponse;
            }, 0)
        })
    }

});
