var req = new XMLHttpRequest();
req.open( 'PUT', 'http://127.0.0.1:1337/', true);
req.send('something%20here=true&yay=true&hello=world');
console.log("We sent something!");
