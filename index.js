// Import the HTTP module
const http = require('http');
// Import the URL module
const url = require('url');

var data = [{
    'id': 1,
    'name': 'complete homework',
    'isCompleted': true,
},
{
    'name': 'complete homework',
    'id': 2,
    'isCompleted': false,
},
{
    'id': 3,
    'name': 'complete homework',
    'isCompleted': true,
},];
// Make our HTTP server
const server = http.createServer((req, res) => {

    // Parse the request url
    const reqUrl = url.parse(req.url).pathname;
    if (reqUrl == '/') {
        res.write('default route hello world');
        res.end();
    }
    else if (reqUrl == '/tasks' && req.method == 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data), null, 3);
        console.log(req);
        res.end();
    }
    else if (reqUrl == '/tasks' && req.method == 'POST') {

        req.on('data', function (chunk) {

            data.push(JSON.parse(chunk.toString()));
            console.log(data);
            console.log(chunk.toString());

        });

        req.on('end', function () {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(data));
            res.end();

        });

    }
    else if (reqUrl == '/tasks' && req.method == 'DELETE') {
        req.on('data', function (chunk) {

            data.push(JSON.parse(chunk.toString()));
            console.log(data);
            console.log(chunk.toString());

        });

        req.on('end', function () {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(data));
            res.end();

        });

    }
});
// Have the server listen on port 9000
server.listen(8000);
console.log('server is listening at 8000');
