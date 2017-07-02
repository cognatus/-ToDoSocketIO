var List = require('../moduls/List');

exports.getList = function(req, res, next) {

	List.find(function(err, doc) {

		if(err){ 

			next(err);

		}else{

			res.status(200).jsonp(doc);

		}

	});

};

exports.addElement = function(req, res, next) {

	var list = new List({
		done:	 false,
		task:	 req.body.task
	});

	list.save(function(err, doc) {
		if(err){ 

			next(err);

		}else{

			res.status(200).jsonp(doc);

		}
	});

};

exports.removeElement = function(req, res, next) {

	List.remove({ _id: req.body.id}, function(err, doc) {

		if(err){ 

			next(err);

		}else{

			res.status(200).jsonp(doc);

		}

	});

}

exports.checkElement = function(req, res, next) {

	List.findById( req.body.id, function (err, list) {
		
		if(err){ 

			next(err);

		}else{

			list.done = req.body.done;

			list.save(function(err, doc) {
				if(err){ 

					next(err);

				}else{

					res.status(200).jsonp(doc);

				}
			});

		}

		
	});

}

exports.moveElement = function(req, res, next) {

	var movement = req.body.movement;
	var lugar = req.body.lugar;

	List.find()
	.then(function(data) {
		return uppdateLugar(lugar, null);	
	})
	.then(function (data) {
		return uppdateLugar(lugar+movement, lugar);
	})
	.then(function (data) {
		uppdateLugar(null, lugar+movement);
		res.status(200).jsonp(data);
	})
	.catch(next);

}

var uppdateLugar = function(lugar, movimiento) {
	List.update({lugar: lugar}, {$set: {lugar: movimiento}},function(err, doc) {

		if(err){ 

			return err;

		}else{

			return doc;

		}
	})
}