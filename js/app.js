require(
    ['mymodule', 'jquery', '../../node_modules/underscore/underscore', '../../node_modules/backbone/backbone'],
    function( Module, $, _, backbone ){ //Module при этом не будет доступна в глобальной области видимости, доллар в глобальную область 
		var data = [{
			
		
		
		}];
		
		var Item = Backbone.Model.extend({
			title : null,
			picture : null,
			descr : null
		})
		
		var ItemCollection = Backbone.Collection.extend({
			model : Item
		})
		
		var Router = Backbone.Router.extend({
			routes: {
				"home": "home"
			},
			
			home : function() {
			  console.log("yolo");
			}
		})
		
		
		new Router();
		
		Backbone.history.start({pushState: true});
		
		for (i=0; i<20; i++) {
			$('.grid').append( Module.gallery );
		}
    }
);