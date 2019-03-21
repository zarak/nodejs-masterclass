const http = require('http');
const config = require('./config');
const url = require('url');
const fs = require('fs');

const httpServer = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    chosenHandler((statusCode) => {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end("Hello, world!");
    });
});

httpServer.listen(config.httpPort, () => {
    console.log("The server is running on port "+config.httpPort+".");
});

const handlers = {};

handlers.notFound = (callback) => {
    callback(404);
};

handlers.hello = (callback) => {
    callback(200);
};

const router = {
    'hello': handlers.hello
};
