require(
    ['mymodule', 
	'jquery', 
	'../../node_modules/underscore/underscore', 
	'../../node_modules/backbone/backbone', 
	'../../node_modules/dot/doT',
	'../../node_modules/text/text!../tpl/gallery_item.html'],
    function( Module, $, _, backbone, doT, gallery_item){ 
		var data = [{		
		
		}];
		
		var _ = this._;		
		
		var Item2 = Backbone.Model.extend({
			title : null,
			picture : null,
			descr : null
		});
		
		
		var ItemCollection = Backbone.Collection.extend({
			model : Item2
		});
				 
		var Router = Backbone.Router.extend({
			routes: {
				"home": "home"
			},
			
			home : function() {
			  console.log("yolo");
			},
		});		
		
		$('.top-menu li a').click(function(){
			Router.navigate("home", {trigger: true, replace: true});
		});
		new Router();
		
		Backbone.history.start({pushState: true});

		
		var Item = Backbone.Model.extend({
			defaults: {
				part2: 'world'
			}
		});
		
		var List = Backbone.Collection.extend({
			model: Item
		});
		
		var ItemView = Backbone.View.extend({
			tagName: 'li', // name of (orphan) root tag in this.el
			events: {
			  'click span.swap':  'swap',
			  'click span.delete': 'remove'
			},
			// `initialize()` now binds model change/removal to the corresponding handlers below.
			initialize: function(){
			  _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

			  this.model.bind('change', this.render);
			  this.model.bind('remove', this.unrender);
			},
			// `render()` now includes two extra `span`s corresponding to the actions swap and delete.
			render: function(){
			  $(this.el).html('<span style="color:black;">'+this.model.get('part1')+' '+this.model.get('part2')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
			  return this; // for chainable calls, like .render().el
			},
			// `unrender()`: Makes Model remove itself from the DOM.
			unrender: function(){
			  $(this.el).remove();
			},
			// `swap()` will interchange an `Item`'s attributes. When the `.set()` model function is called, the event `change` will be triggered.
			swap: function(){
			  var swapped = {
				part1: this.model.get('part2'),
				part2: this.model.get('part1')
			  };
			  this.model.set(swapped);
			},
			// `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
			remove: function(){
			  this.model.destroy();
			}	
		});
	

	

		var ListView = Backbone.View.extend({
			el: $('.grid'), // el attaches to existing element
			events: {
			  'click .load-more': 'addItem'
			},
			initialize: function(){
			  _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

			  this.collection = new List();
			  this.collection.bind('add', this.appendItem); // collection event binder

			  this.counter = 0;
			  this.galleryItemsAmount = 32;
			  this.render();
			},
			render: function(){
			  var self = this;
			  
			  // 32 items
			  	for (this.counter; this.counter < 4; this.counter++) {
					var compiled = doT.template(gallery_item); 
					$(this.el).append(compiled({path: this.counter + 1 ,title: 'Yeeeaaa'}));
				}
				$(this.el).append('<div class="load-more"></div>');
				
				// EVENTS 
				/*var object = {};
				_.extend(object, Backbone.Events);

				object.on('click', '.load-more', function() {
				  console.log('more');
				});*/
				
				$('.load-more').on('click', '.load-more', function() {
				  console.log('more');
				});
			  
			  
			  //????
			 /* _(this.collection.models).each(function(item){ // in case collection is not empty
				self.appendItem(item);
				console.log('11');
			  }, this);*/
			},
			
			addItem: function(){
				var max = this.counter + 4;
				$('.load-more').remove();
				var item = new ItemCollection();
				item.set({
					path: this.counter, 
					title: item.get('title')
				});

				while (this.counter + 1 <= max) {
				    var stopLoad = (this.counter >= this.galleryItemsAmount);
				    if (stopLoad) return;
					var compiled = doT.template(gallery_item); 
					$(this.el).append(compiled({path: this.counter + 1, title: 'Yeeeaaa'}));
					this.counter++
				}
				$(this.el).append('<div class="load-more"></div>');
			  //this.collection.add(item);
			},

			appendItem: function(item){
			  var itemView = new ItemView({
				model: item
			  });
			  $('ul', this.el).append(itemView.render().el);
			}
		});
				
		var listView = new ListView();
		

		
    }
);
