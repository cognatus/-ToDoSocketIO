var List = require('../moduls/List');

exports.getList = function(req, res) {

	List.find(function(err, doc) {

		if(err){ 

			res.send(500, err.message);

		}else{

			res.status(200).jsonp(doc);

		}

	});

};

exports.addElement = function(req, res) {

	var list = new List({
		done:	 false,
		task:	 req.body.task
	});

	list.save(function(err, doc) {
		if(err){ 

			res.send(500, err.message);

		}else{

			console.log('doc',doc)

			res.status(200).jsonp(doc);

		}
	});

};

exports.removeElement = function(req, res) {

	List.remove({ _id: req.body.id}, function(err, doc) {

		if(err){ 

			res.send(500, err.message);

		}else{

			res.status(200).jsonp(doc);

		}

	});

}

exports.checkElement = function(req, res) {

	List.findById( req.body.id, function (err, list) {
		
		if(err){ 

			res.send(500, err.message);

		}else{

			list.done = req.body.done;

			list.save(function(err, doc) {
				if(err){ 

					res.send(500, err.message);

				}else{
					console.log(req.body.done)

					res.status(200).jsonp(doc);

				}
			});

		}

		
	});

}

exports.moveElement = function(req, res) {

	List.find( function (err, list) {
		
		if(err){ 

			res.send(500, err.message);

		}else{

			var movement = req.body.movement;
			var lugar = req.body.lugar;

			List.update({lugar: lugar}, {$set: {lugar: null}},function(err, doc) {

				if(err){ 

					res.send(500, err.message);

				}else{

					List.update({lugar: lugar+movement}, {$set: {lugar: lugar}},function(err, doc) {

						if(err){ 

							res.send(500, err.message);

						}else{

							List.update({lugar: null}, {$set: {lugar: lugar+movement}},function(err, doc) {

								if(err){ 

									res.send(500, err.message);

								}else{

									res.status(200).jsonp(doc);

								}
							})

						}
					})

				}
			})


			/*uppdateLugar(lugar, null)
			.then(function (data) {
				// handle data
				return uppdateLugar(lugar+movement, lugar)
			})
			.then(function (csv) {
				uppdateLugar(null, lugar+movement)
			})
			.catch(next);*/
		}

		
	});

}

function uppdateLugar(lugar, movimiento) {
	List.update({lugar: lugar}, {$set: {lugar: movimiento}},function(err, doc) {

		if(err){ 

			return err;

		}else{

			return doc;

		}
	})
}