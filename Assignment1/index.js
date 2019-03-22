const http = require('http');
const config = require('./config');
const url = require('url');

const httpServer = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    
    const data = {};

    if (method == 'post' && trimmedPath == 'hello') {
        data.message = "Hello, world!";
    };

    const chosenHandler = router[trimmedPath] || handlers.notFound;
    
    chosenHandler(data, (statusCode) => {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(JSON.stringify(data));
    });
});

httpServer.listen(config.httpPort, () => {
    console.log("The server is running on port "+config.httpPort+".");
});

const handlers = {};

handlers.notFound = (data, callback) => {
    callback(404);
};

handlers.hello = (data, callback) => {
    callback(200);
};

const router = {
    'hello': handlers.hello
};
