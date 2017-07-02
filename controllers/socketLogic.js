exports.init = function (socket) {
	console.log('socket iniciado');
}

exports.add = function(socket) {

	socket.on('add', function(data){
		socket.broadcast.emit('newTask', data);
	});

}

exports.moveElement = function(socket) {

	socket.on('moveElement', function(index, movement){
		socket.broadcast.emit('elementMoved', index, movement);
	});

}

exports.removeElement = function(socket) {

	socket.on('removeElement', function(index){
		socket.broadcast.emit('elementRemoved', index);
	});

}

exports.checkElement = function(socket) {

	socket.on('checkElement', function(index, done){
		socket.broadcast.emit('elementChecked', index, done);
	});

}