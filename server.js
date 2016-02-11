var connect = require('connect');
var port = process.env.PORT || 1337;

connect.createServer(connect.static(__dirname)).listen(port);
console.log('Listening on ' + port + '...');
console.log('Press Ctrl + C to stop');
