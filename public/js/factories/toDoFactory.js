(function() {
	'use strict';

	angular.module('aplicacion').factory('toDoFactory', toDoFactory);
	toDoFactory.$inject = ['$http'];

	function toDoFactory($http){
		
		var hp = $http;

		return {
			add: function(newTask) {
				return hp({
					method: 'POST',
					url: '/todo/',
					data: {
						task: 	newTask
					},
					headers: {'Content-Type': 'application/json;charset=utf-8'} 
				});
			},
			getList: function(newTask) {
				return hp({
					method: 'GET',
					url: '/todo/'
				});
			},
			removeElement: function(id) {
				return hp({
					method: 'DELETE',
					url: '/todo/',
					data: {
						id: id
					},
					headers: {'Content-Type': 'application/json;charset=utf-8'} 
				});
			},
			checkElement: function(id, done) {
				return hp({
					method: 'PUT',
					url: '/todo/',
					data: {
						id: id,
						done: done
					},
					headers: {'Content-Type': 'application/json;charset=utf-8'} 
				});
			},
			moveElement: function(index, lugar, movement) {
				return hp({
					method: 'PUT',
					url: '/todo/move',
					data: {
						index: index,
						movement:  movement,
						lugar: lugar
					},
					headers: {'Content-Type': 'application/json;charset=utf-8'} 
				});
			}

		};
	}

})();