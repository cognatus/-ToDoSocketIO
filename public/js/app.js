(function() {
	'use strict';

	angular
		.module('aplicacion', [])
		.filter('ordenamela', function() {
			return function(obj) {
				for( var i = 0; i < (obj.length-1); i++ ){

					for( var j = 0; j < (obj.length-1); j++ ){

						if( obj[j].lugar > obj[j+1].lugar ){

							 var aux = obj[j];
							 obj[j] = obj[j+1];
							 obj[j+1] = aux;
						}
					}
				}
			 
				return obj;
			};
		});
		
})();