# OET - Module - Header

## Goals

integration with Legacy via notifications

Supported Legacy projects:
* https://github.com/albumprinter/oet-js-walldecor
* https://github.com/albumprinter/oet-js-phonecase
* https://github.com/albumprinter/oet-js-calendar

## Usage

### Clone the repository in a local directory

get the repo
```
git clone git@github.com:albumprinter/oet-header.git oet-header
cd oet-header
```

### Setup the local environment:

```
// install dependencies
npm install

// Build it
grunt build

// Start local web server (with external services)
grunt dev

// Running tests in JSUnit:
grunt test

// Running new Mocha tests with Testem
testem

```

### Development

All the module logic resides in the src/ folder  

CSS is located in src/css/ folder

If you want to add more .scss files here do not forget to add them to grunt task in /oet-header/config/grunt/sass.js


#### src/bootstrap.js 
is used to bootstrap the module, won't be included in application as it will be done in nextgen by walldecor/phonecase/calendar controller

```javascript
headerModule.init()
    .then(
        function() {
            console.log('header module bootstrapped successfully');

        },
        function(err) {
            console.error('header module error:', err.stack);
        }
    );
```

####  src/index.js 
required in bootstrap file used to get configuration from Legacy code and invoke appropriate desktop or mobile controller 

```javascript
return service.config()
    .then(
        function(config){
            var headerController;

            if ( config.mobile ) {
                headerController = require('./header.controller.mobile');
            } else {
                headerController = require('./header.controller');
            }

            return headerController.init(config);
        });
```

#### src/notifications.service.js 
used to serve notifications for Header module  

```javascript
// subscribes to bus and wait for specific message, 
// once receive it - carry out unsubscribe and return payload as a promise

//  It's used to get configuration from Legacy once
NotificationService.prototype.once = function(notification){
    var deferred = Q.defer();

    bus.subscribe(handleMsg);
    function handleMsg (message, payload){
        if ( message === notification ) {
            debugger;
            bus.unsubscribe(handleMsg);
            deferred.resolve( payload );
        }
    }
    return deferred.promise;
};
```

```javascript
// subscribes to all notifications from bus and add them to array until view is not ready 
// notify parameter is equal to notification handler function in controller 
// and by returning runNotificationQueue in the result notify === runNotificationQueue 

// once handler invoked in controller it means view is ready - we handle all notifications from array 
//by running runNotificationQueue()
NotificationService.prototype.subscribe = function(notify){

    var isReady = false,
        queue = [];

    var notificationHandler = function(message, payload) {
        if (!isReady) {
            queue.push({
                'message': message,
                'payload': payload
            });
            return;
        }
        notify(message, payload);
    };

    var runNotificationQueue = function() {
        isReady = true;

        for (var i = 0; i < queue.length; i++) {
            notificationHandler(
                queue[i].message,
                queue[i].payload
            );
        }
    };

    bus.subscribe(notificationHandler.bind(this));

    return runNotificationQueue;
};
```
    
    
#### service

##### /src/header-module/header.service.js

Contains general logic not associated with view like

getting config from legacy
```javascript
HeaderService.prototype.config = function(){
    return notifications.once('HEADER_INIT');
};
```

using message bus with sockets

only for development, read http://intranet/display/JS/Message+Bus

```javascript
HeaderService.prototype.connectToLegacy = function(){

    var s = document.createElement( "script" );
    s.setAttribute( "src", "http://localhost:8001/socket.io/socket.io.js" );
    s.onload = function() {
        bus.initialize( io.connect( "http://localhost:8001" ));
    };
    document.body.appendChild( s );
};
```


#### controller
(separate for desktop and mobile) 

##### /src/header-module/header.controller.js
##### /src/header-module/header.controller.mobile.js

responsible for any communication to the outside world manages the view and passes itself as a $scope to the view on initiation

here is all logic related to view, if user is doing something on Header we handle it in controller

```javascript
HeaderController.prototype.init = function(config){
    this.$config = config || {};
    this._isPreviewMode = false;
    this._notifications = new Notifications();

    // add notifications to the a queue using notifications.service
    var dispatchNotifications = this._notifications.subscribe(this._notificationHandler.bind(this));

    // broadcast notifications to Legacy
    this.handleOrderRequest = function() {
        bus.broadcast('HEADER_CHECKOUT');
    };

    // initialize view, then run notification handler 
    this.$view = new view();
    return this.$view.init(this)
        .then(dispatchNotifications);
};
```

notification handler show/hide buttons

```javascript
HeaderController.prototype._notificationHandler = function(message, payload) {

    switch(message) {

        // toggle preview/editor view in Legacy
        // Commands:
        // PreviewModeActiveCommand
        case 'HEADER_PREVIEW_MODE_ACTIVE':
            this.$view.toggleToPreviewButton( payload );
            this._isPreviewMode = payload;
            break;

        // hide/show buttons in header if photos are added/removed in Legacy
        // Commands:
        // RemovePhotoFromPlaceholderCommand
        // BaseStorageRequestCommand
        case 'HEADER_STATE_PHOTOS_REGISTERED_AND_UPLOADED':
            this.$view.setShopButtonEnabled( payload );
            this.$view.setPreviewButtonEnabled( payload );
            break;

        // hide order button
        // Commands:
        // startCheckoutCommand
        case 'HEADER_CHECKOUT':
            this.$view.setShopButtonEnabled( false );
            break;
        
        // cancel checkout if not all photos have been uploaded yet
        // Commands:
        // ValidateCheckoutCommand
        // CheckPhotoQualityCommand
        case 'HEADER_CHECKOUT_CANCELLED':
        case 'HEADER_CHECKOUT_FAILED':
            this.$view.setShopButtonEnabled( true );
            break;

        // there need to be more than 1 valid photo 
        // Commands:
        // ValidateProductCommand
        case 'HEADER_STATE_PRODUCT_VALIDATED':
            this.$view.setShopButtonEnabled( payload );
            this.$view.setPreviewButtonEnabled( payload );
            break;
        
        // UpdateProductPriceCommand
        case 'HEADER_PRODUCT_PRICE_UPDATED':
            this.$view.updatePrice( payload );
            break;

    }
};
```


#### view
(desktop and mobile accordingly)

##### /src/header-module/header.view.js 
##### /src/header-module/header.view.mobile.js
 
knows nothing of the outside world, only knows of the controller as $scope, 
invokes handlers described in controller when some action takes place 

```javascript
// init function return rendered swig template with cached DOM elements and  attached events
HeaderView.prototype.init = function(controller){
    this.$scope = controller;
    this.$wrapper = controller.$config.wrapper || document.body;
    this._calendar = this.$scope.$config.buttons.addEvents;
    this._isFullScreen = false;

    return this.render(this.$wrapper, this.$scope.$config)
        .then( this._registerDOM.bind(this) )
        .then( this._registerBehaviour.bind(this));
};

```
   
### Integration


#### oet-message-bridge module used on Legacy side

##### to broadcast messages 

```javascript
this.sendNotification( bridge.notifications.Bridge.BROADCAST, [ "HEADER_INIT", config ]);
```

##### and to tranform messages to pureMVC notification using BridgeMapping  

```javascript
{
    srcType     : "HEADER_PREVIEW_MODE_ACTIVE",
    targetType  : easy.notifications.Editor.PREVIEW_MODE_ACTIVE
},
{
    srcType     : "HEADER_CHECKOUT",
    targetType  : easy.notifications.Shop.START_CHECKOUT
},
{
    srcType     : "HEADER_NAVIGATE_HISTORY_BACK",
    targetType  : lib.notifications.NavigationNotes.NAVIGATE_HISTORY_BACK
}
```

where "src" describes the message received from the bridge

"target" describes the message to be broadcast over PureMVC as a notification

transformFn parameter is optional, a function that can be used to transform the message payload data into another data type


#### oet-lib/bus is used on nexgen side 

used methods 

```javascript
bus.subscribe(handler);
bus.unsbscribe(handler);
bus.broadcast(message, payload);
```

### How to add header module to Legacy

Build module with oet-nextgen builder https://github.com/albumprinter/oet-nextgen

Include oet-nextgen in Legacy by adding it to 'devDependencies' in package.json 

Install dependencies

```javascript
npm install 
```
init it in PrepareViewCommand

```javascript
 window[ "nextGenWalldecor" ][ "init" ]();
```

### UNIT tests

#### Notifications Service 

Method once() should listen to bus and wait for specific message type

```javascript
//  use Notifications Service 
var Notifications = require('../header-module/notifications.service');

describe('#once()', function(){
	var notifications;

	before(function() {
	    // create instance of Notifications Service 
		notifications = new Notifications();
	});

	it('should listen to bus and wait for specific message type', function(done){
		//arrange
		var expected = {type: 'TEST'};

		//act
		
		// subscribe to spesific message
		// if we receive it - check recieved payload with expected
		// by adding a callback (done) to it() Mocha will know that it should wait 
		// for completion of asynchronous code
		// callback should be invoked when test is complete 
		notifications.once('TEST_EVENT')
			.then(function(actual){
				assert.equal(expected, actual);
				done();
			});
		
		// broadcast expecting message with payload	
		notifications.bus.broadcast('TEST_EVENT', expected);
	});

});
```

Method subscribe() 

Here we check that notifications in queue will be processed once view will be ready and handler invoked 

```javascript
it('should notify after ready() invoked', function(done){
	//arrange
	var expected = {
		message: 'TEST_EVENT',
		payload: ['TEST']
	};
	
	//act
	// subscribes to bus messages, once ready() will be invoked function inside will be runed
	// we check received message(actual) with expected
	var ready = notifications.subscribe(function(message,payload){
		var actual = {
			message: message,
			payload: payload
		};
		
		assert.deepEqual(expected, actual);
		done();
	});
	
	// broadcast message that will be added to array and wait in a queue to be handled
	notifications.bus.broadcast(expected.message, expected.payload);
	
	// emulate waiting when view will be rendered 
	notifications.bus.subscribe(function(){
		setTimeout(function(){
			// call handler for notifications in a queue 
			ready();
		}, 50);
	});

});
```
