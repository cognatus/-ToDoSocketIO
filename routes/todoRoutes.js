var todoREST = require('../controllers/todoREST');

var express = require('express');
var router = express.Router();

router.route('/')
	.get(todoREST.getList)
	.post(todoREST.addElement)
	.delete(todoREST.removeElement)
	.put(todoREST.checkElement);

router.route('/move')
	.put(todoREST.moveElement);


module.exports = router;