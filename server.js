var http = require('http');
var SERVER_TYPE = 'Keystone Datapute NodeJS Unix';

var mongodb = require('mongodb');
     var db = new mongodb.Db('nodejitsu_gene_nodejitsudb9070767995',
       new mongodb.Server('ds051977.mongolab.com', 51977, {'journal':true})
     );
     
     
     db.open(function (err, db_p) {
       if (err) { throw err; }
       db.authenticate('nodejitsu_gene', '9e76kjc48m75ji4qgmbp9t88qe', function (err, replies) {
         // You are now connected and authenticated.
    http.createServer(function(req, res) {
      if (req.method.toLowerCase() === 'put') {
        // parse a beacon
        standardHeads = {"Access-Control-Allow-Origin": '*', 'content-type': 'text/plain', 'From':'gjones@keystonesolutions.com', 'Server':SERVER_TYPE, 'Pragma':'no-cache', 'Access-Control-Allow-Methods':'PUT', 'Access-Control-Allow-Headers': 'Content-Type'};
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
            db.entries.save(data);
            //insert data into a database here
        });

        }
      else {
        if (req.method.toLowerCase() === 'get'){
            res.writeHead(200, 'OK', {'content-type': 'text/html', "Access-Control-Allow-Origin": '*','From':'gjones@keystonesolutions.com', 'Server':SERVER_TYPE, 'Access-Control-Allow-Methods':'PUT', 'Access-Control-Allow-Headers': 'Content-Type'});
            res.write('<html><head><title>Keystone Datapute</title></head>');
            res.write('<body><h1>Keystone Datapute</h1><p>This server collects data. No enduser access. Thanks!</p></body></html>');
            res.end();
        }
        else{
            if (req.method.toLowerCase() === 'options'){
                //list all options the API allows for
                res.setHeader('Allow', ['GET','PUT','OPTIONS']);
                res.writeHead(200, 'OK', {"Access-Control-Allow-Origin": '*', 'content-type': 'text/plain', 'From':'gjones@keystonesolutions.com', 'Server':SERVER_TYPE, 'Access-Control-Allow-Methods':'PUT', 'Access-Control-Allow-Headers': 'Content-Type'});
                res.end('Allow: GET,PUT,OPTIONS'); //technically the body doesn't need anything, this is just to be nice
            }
            else{
                res.writeHead(405, 'Method Not Allowed', {'content-type': 'text/plain', 'From':'gjones@keystonesolutions.com', 'Server':SERVER_TYPE});
                res.end('See what options are allowable using a HTTP OPTIONS'); //the params didn't work right.
            }
        }
      }
    }).listen(80);
  });
});
