var http = require('http');
var qs = require('querystring');

http.createServer(function(req, res) {
  if (req.method.toLowerCase() === 'put') {
    // parse a beacon
    res.writeHead(200, 'OK', {'content-type': 'text/plain'});
    res.write('good');
    var body = '';
    req.on('data', function (data) {
            body += data;
    });
    req.on('end', function () {

        var body_parsed = qs.parse(body);
        console.log(body_parsed);
        res.end(); //send back a speedy ok response, then do our fine work
        //perform spot check validation on data entry here
        
        //insert data into a database here
    });

    }
  else {
    res.writeHead(404, 'Error');
    res.end(); //the params didn't work right.
    }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
