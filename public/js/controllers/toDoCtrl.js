(function() {

	'use strict';

	angular.module('aplicacion').controller('toDoCtrl', toDoCtrl);
	toDoCtrl.$inject = ['$scope', 'toDoFactory'];

	var socket = io('/todo');


	function toDoCtrl($scope, toDoFactory){

		var vm = $scope;
		var fc = toDoFactory;

		vm.list = [];

		vm.init = function() {
			fc.getList()
			.then(
			function successCallback(doc) {

				vm.list = doc.data;

			}, 
			function errorCallback(err) {
				
				console.log(err)
				alert('Something went wrong getting the list dude');
			
			})
		}

		vm.move = function(index, lugar, movement) {

			if ( index+movement < vm.list.length && index+movement >= 0 ){
			

				fc.moveElement(index, lugar, movement)
				.then(
				function successCallback(doc) {

					socket.emit('moveElement', index, movement);

					moveList(index, movement);
					

				}, 
				function errorCallback(err) {
					console.log(err)
					alert('Something went wrong adding dude');
				})
			}
		}

		vm.add = function () {
			if ( vm.newTask != undefined ) {

				fc.add(vm.newTask)
				.then(
				function successCallback(doc) {

					socket.emit('add', doc.data);
					vm.list.push(doc.data);
					vm.newTask = undefined;

				}, 
				function errorCallback(err) {
					console.log(err)
					alert('Something went wrong adding dude');
				})
			}
		}

		vm.remove = function (index) {
			fc.removeElement(vm.list[index]._id)
			.then(
			function successCallback(doc) {

				socket.emit('removeElement', index);
				vm.list.splice(index, 1);
			}, 
			function errorCallback(err) {
				console.log(err)
				alert('Something went wrong removing dude');
			})
		}

		vm.checar = function (index, obj) {

			var aux = !obj.done;
			
			fc.checkElement(obj._id, aux)
			.then(
			function successCallback(doc) {

				socket.emit('checkElement', index, aux);
				obj.done = aux;

			}, 
			function errorCallback(err) {
				console.log(err)
				alert('Something went wrong checking dude');
			})
		}


		//socket stuff

		socket.on('newTask', function(data) {

			vm.$apply(function() { vm.list.push(data); });

		})

		socket.on('elementMoved', function(index, movement) {
			
			vm.$apply(function() { moveList(index, movement); });

		})

		socket.on('elementRemoved', function(index) {
			
			vm.$apply(function() { vm.list.splice(index, 1); });

		})

		socket.on('elementChecked', function(index, done) {
			
			vm.$apply(function() { vm.list[index].done = done; });

		})


		//other functions
		function moveList(index, movement) {
			var aux = vm.list[index+movement].lugar;
			vm.list[index+movement].lugar = vm.list[index].lugar;
			vm.list[index].lugar = aux;
		}

	}
})();