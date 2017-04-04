const Fetch = require('./fetch');
const Export = require('./export');
const http = require('http');
const config = require('./config.json');

setImmediate(Fetch);
setInterval(Fetch, config.interval);

const port = process.env.PORT || '1203';
http.createServer(Export).listen(port);