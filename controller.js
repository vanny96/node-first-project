var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer((req, res) => {
    var q = url.parse(req.url, true)
    var path = "." + q.pathname;
    var file = path === "./" ? "./index.html" : path;

    fs.readFile(file, (err, data) => {
        if (err) {
            fs.readFile("./404.html", (notFoundErr, notFoundData) => {
                if(notFoundErr){
                    console.log(err.stack);
                    res.writeHead(500, { 'Content-Type': 'text/html' })
                    return res.end("Server side error");
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' })
                    return res.end(notFoundData)
                }
            })
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data);
            return res.end();
        }
    })
}).listen(8080);
