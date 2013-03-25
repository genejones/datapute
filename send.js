var req = new XMLHttpRequest();
req.open( 'PUT', 'http://127.0.0.1:1337/', true);
req.send('something here');
console.log("We sent something!");
