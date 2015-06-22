# OET - Module - Header

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

### Developing

All the module logic goes into the src/ folder  

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

### Integration

#### oet-message-bridge module is used on Legacy side

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


#### controller(desktop and mobile) 

##### /src/header-module/header.controller.js

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
    this.handlePreviewRequest = function() {
        this._isPreviewMode = !this._isPreviewMode;
        bus.broadcast('HEADER_PREVIEW_MODE_ACTIVE', this._isPreviewMode);
    };
    this.handleAddEventRequest = function(){
        bus.broadcast('HEADER_OPEN_EVENT_MANAGER');
    };
    this.fullScreenHandler = function(wrapper) {
        var requestMethod, el;
        if (this._isFullScreen) {
            requestMethod =  document.exitFullscreen || document.webkitExitFullscreen
                || document.mozCancelFullScreen || document.msExitFullscreen;
            el = document;
        } else {
            requestMethod = wrapper.requestFullScreen || wrapper.webkitRequestFullScreen
                || wrapper.mozRequestFullScreen || wrapper.msRequestFullscreen;
            el = wrapper;
        }
        if (requestMethod) {
            requestMethod.call(el);
            this._isFullScreen = !this._isFullScreen;
        }
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
        case 'HEADER_PREVIEW_MODE_ACTIVE':
            this.$view.toggleToPreviewButton( payload );
            this._isPreviewMode = payload;
            break;

        // hide/show buttons in header if photos added/removed in Legacy
        case 'HEADER_STATE_PHOTOS_REGISTERED_AND_UPLOADED':
            this.$view.setShopButtonEnabled( payload );
            this.$view.setPreviewButtonEnabled( payload );
            break;

        // redirects to Shop in Legacy, hide order button
        case 'HEADER_CHECKOUT':
            this.$view.setShopButtonEnabled( false );
            break;
        
        // redirects to Shop in Legacy
        case 'HEADER_CHECKOUT_CANCELLED':
        case 'HEADER_CHECKOUT_FAILED':
            this.$view.setShopButtonEnabled( true );
            break;

        // there need to be more than 1 valid photo 
        case 'HEADER_STATE_PRODUCT_VALIDATED':
            this.$view.setShopButtonEnabled( payload );
            this.$view.setPreviewButtonEnabled( payload );
            break;
        
        case 'HEADER_PRODUCT_PRICE_UPDATED':
            this.$view.updatePrice( payload );
            break;

    }
};
```


#### view(desktop and mobile accordingly)

#####  /src/header-module/header.view.js 
 
knows nothing of the outside world, only knows of the controller as $scope, 
invokes handlers in controller when some action takes place 

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
   
