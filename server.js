var http = require('http');
var qs = require('querystring');
var databaseUrl = 'mongodb://nodejitsu:84b32e944d4c96b9bfc9e09b556c809a@linus.mongohq.com:10092/nodejitsudb5529111437';
collections = ['context'];
var db = require('mongojs'.connect(databaseUrl, collections);

http.createServer(function(req, res) {
  if (req.method.toLowerCase() === 'put') {
    // parse a beacon
    standardHeads = {"Access-Control-Allow-Origin": '*', 'content-type': 'text/plain', 'From':'gjones@keystonesolutions.com', 'Server':'Keystone Drilldown NodeJS Unix', 'Pragma':'no-cache', }
    res.writeHead(200, 'OK', standardHeads);
    var body = '';
    req.on('data', function (data) {
            body += data;
    });
    req.on('end', function () {
        res.end('good'); //send back a speedy ok response, then do our fine work
        data = JSON.parse(body);
        console.log(data);
        //perform spot check validation on data entry here
        //insert data into a database here
    });

    }
  else {
    if (req.method.toLowerCase() === 'get'){
        res.writeHead(200, 'OK', {'content-type': 'text/html'});
        res.write('<html><head><script src="https://raw.github.com/LiosK/UUID.js/master/src/uuid.js"></script></head>');
        res.write('<body><script src="file:///home/gene/Desktop/allSeeingEye/sinon-1.6.0.mod.js"></script><script src="file:///home/gene/Desktop/allSeeingEye/send.js"></script></body></html>');
        res.end();
    }
    else{
        if (req.method.toLowerCase() === 'options'){
            res.writeHead(200, 'OK', {'content-type': 'text/plain', 'From':'gjones@keystonesolutions.com', 'Server':'Keystone Drilldown NodeJS Unix'});
            res.setHeader('Allow', ['GET','PUT','OPTIONS']);
            res.end('Allow: GET,PUT,OPTIONS'); //technically the body doesn't need anything, this is just to be nice
        }
        else{
            res.writeHead(405, 'Method Not Allowed', {'content-type': 'text/plain', 'From':'gjones@keystonesolutions.com', 'Server':'Keystone Drilldown NodeJS Unix'});
            res.end('See what options are allowable using a HTTP OPTIONS'); //the params didn't work right.
        }
    }
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
