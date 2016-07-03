angular.module('myApp')
	.controller('todoCtrl', function($scope, $timeout, todos, oAuth) {
		console.log("it's working")
    $scope.todoList = [];
    
    $scope.todoAdd = function() {
        var newTodo = $scope.newTodo.todoInput;
        todos.addTodos(newTodo)
        .then(function(result) {
            $scope.todoList[0].id = result.id;
        });
        $scope.newTodo.todoInput = '';
        $scope.todoList.unshift({todoText: newTodo});

        // $scope.newTodo.todoInput = "";
    };

    //function to keep track of checked state of todo item
    $scope.saveToggleState = function() {
        console.log('id', this.x.id, 'done', this.x.done)
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

    $scope.signOut = () => {
        oAuth.signOut();
    }
    
    this.$onInit = function() {
        todos.getTodos()
        .then(function(todoResponse){
            $timeout(function(){
                $scope.todoList = todoResponse;
            }, 0)
        })
    }

});