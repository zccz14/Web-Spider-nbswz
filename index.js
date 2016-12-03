const Fetch = require('./fetch');
const Export = require('./export');
const http = require('http');

setImmediate(Fetch);
setInterval(Fetch, 60 * 1000); // every minute

var port = process.env.PORT || '1203';
http.createServer(Export).listen(port);