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
		
		//console.log(JSON.stringify(Data.itemsList));
		
		var _ = this._;		
		
		var Item2 = Backbone.Model.extend({
				prop1: 'sdf',
				prop2: 'sdf11'
		});
		
		
		var ItemCollection = Backbone.Collection.extend({
			model : Item2
		});
		
		/*var collection = new Backbone.Collection([
		  {name: "Тим", age: 5},
		  {name: "Ида", age: 26},
		  {name: "Роб", age: 55}
		]);
		


		var names = collection.map(function(book) {
		  return book.get("name");
		});*/
		
		
		var thumbItem = Backbone.Model.extend({
			defaults: {
				title: 'historical'
			}
		});

		var thumbCollection = Backbone.Collection.extend({
			model: thumbItem,
			url: '../data/data'
		});

		var thumbs = new thumbCollection();
		
		var onSuccess = function(thumbs) {
			console.log('11');
			var firstBook = thumbs.at(0);
			alert(firstBook.get('title') + ' принадлежит к жанру ' + firstBook.get('author'));
		};

		thumbs.add({
			title: 'A Tale of Two Cities',
			author: 'Charles Dickens',
			publisher: 'Chapman & Hall'
		});

		thumbs.add({
			title: 'The Good Earth',
			author: 'Pearl S. Buck',
			publisher: 'John Day'
		});
		
		var books = new Backbone.Collection();
		books.model = thumbItem;
		books.url = '/data/data.js';
		
		books.fetch({
			success: onSuccess
		});
	
		console.log(books);
	
		/*collection.each(function(book) {
		  console.log(book.get("name"));
		});*/

		
		//console.log(names);
				 
		var Router = Backbone.Router.extend({
			routes: {
				"home": "home"
			},
			
			home : function() {
			  console.log("yolo");
			},
		});	

		function scrollToElement(el) {
			$('body,html').animate({
					scrollTop: el.offset().top
			}, 700);
		}		
		
		$('.top-menu li').click(function(e){
			$('.top-menu li').removeClass('active');
			//Router.navigate("home", {trigger: true, replace: true});
			var el = e.currentTarget;
			$(el).addClass('active');
			var pathname = '#' + $(el).find('a').data('pathname');
			scrollToElement($(pathname));
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
	
		//Module.gallery();
	

		var ListView = Backbone.View.extend({
			el: $('.grid'), // el attaches to existing element
			events: {
			  'click .load-more': 'addItem',
			  'click .load-less': 'hideItems',
			  'click .load-full': 'showItems',
			},
			initialize: function(){
			  _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

			  this.collection = new ItemCollection();
			  //console.log(this.collection);
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
					$(this.el).append(compiled({view: 'initial', path: this.counter + 1 ,title: 'Yeeeaaa'}));
				}
				$(this.el).append('<div class="load-more"></div>');
				
				// EVENTS 
				/*var object = {};
				_.extend(object, Backbone.Events);

				object.on('click', '.load-more', function() {
				  console.log('more');
				});*/
				
						  
			  
			  //????
			  _(this.collection.models).each(function(item){ // in case collection is not empty
				self.appendItem(item);
				console.log('11');
			  }, this);
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
				    if (stopLoad) {
						$(this.el).append('<div class="load-less">Свернуть работы</div>');
						return;
					};
					var compiled = doT.template(gallery_item); 
					$(this.el).append(compiled({view: 'listed', path: this.counter + 1, title: 'Yeeeaaa'}));
					this.counter++
				}
				$(this.el).append('<div class="load-more"></div>');
			  //this.collection.add(item);
			},
			hideItems: function(){
				$('.listed').hide();
				$('.load-less').remove();
				$('body,html').animate({
						scrollTop: 0
				}, 700);
				$(this.el).append('<div class="load-full">Показать все работы</div>');
			},
			showItems: function(){
				$('.listed').show();
				$('.load-full').remove();
				$(this.el).append('<div class="load-less">Свернуть работы</div>');
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
