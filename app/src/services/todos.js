(function(){
  'use strict';

  angular.module('myApp')
         .factory('todos', function($rootScope) {    

    const addTodos = function(newTodoItem) {
      let userId = JSON.parse( window.localStorage['Parse/keyitup/currentUser']).objectId;  
      var Obj = Parse.Object.extend("todos");
      var User = Parse.Object.extend("User");
      var user = new User();
      user.id = userId;
      var newTodos = new Obj();

      newTodos.set("todoItem", newTodoItem);
      newTodos.set("user", user);
      newTodos.set("done", false);

      return newTodos.save()
      .then(function(result) {
        var newObj = {};
        newObj.id = result.id;
        newObj.todoText = result.get('todoItem');
        newObj.done = result.get('done');
        // newObj.user = userId;
        console.log('service addnew', newObj)
        return newObj;
      }, function(error) {
        console.log(error)
      })
    };   

    const saveStatus = (id, status) => {
      const objSave = Parse.Object.extend("todos");
      let updStatus = new objSave();
      updStatus.id = id;
      updStatus.set("done", status);
      updStatus.save(null, {
        success: result => result,
        error: error => {
          console.log("result", error);
        }
      })
    }

//Deleting todo items

    const deleteTodos = function(deletedList) {
      var deleteDate = new Date();
      var Todo = Parse.Object.extend("todos");
      
      var arrayToDelete = deletedList.map(function(obj){
        var deletedTodo = new Todo();
        deletedTodo.id = obj.id;
        deletedTodo.set('deleteAt', deleteDate);
        return deletedTodo;
      });
      Parse.Object.saveAll(arrayToDelete, {
        success: function(result) {
        },
        error: function(error) {
          console.error(error);
        }
      })
    }

//Pulling todo items from DB

    const getTodos = function() {
      let userId = JSON.parse( window.localStorage['Parse/keyitup/currentUser']).objectId;      
      var TodoList = Parse.Object.extend('todos');
      var User = Parse.Object.extend("User");
      var user = new User();
      user.id = userId;
      var Query = new Parse.Query(TodoList);
      console.log('userId', userId)
      console.log('userId Type', typeof userId);

      Query.doesNotExist("deleteAt");
      Query.equalTo('user', user);
      console.log('query', Query)
      return Query.addDescending('createdAt').find({
        success: function(result) {
          console.log('query result', result)
          return result;
        },
        error: function(error) {
          console.error(error);
        }
      })
      .then(function(result) {
        return result.map(function(todo) {
          var todoObj = {};
          todoObj.todoText =  todo.get('todoItem');
          todoObj.done = todo.get('done');
          todoObj.id = todo.id;
          todoObj.deleteAt = todo.get('deleteAt');
          todoObj.user = todo.get('user');
          console.log('todoObj', todoObj.user)
          return todoObj;
        }) 
      })
    };   

    return {
      addTodos: addTodos,
      getTodos: getTodos,
      saveStatus: saveStatus,
      deleteTodos: deleteTodos,
    };      

  });

})();


 

