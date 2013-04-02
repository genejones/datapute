//requires https://raw.github.com/LiosK/UUID.js/master/src/uuid.core.js to be placed before it
//only checks for omniture beacons on first run...
var collector = window._hddata;
pageHash = UUID.generate(); //a unique pageHash to corelate omniture results with collector items.

var existingBeacons = [];


if (!window.s.usePlugins){window.s.usePlugins = true;}
if (!window.s.doPlugins) { window.s.doPlugins= function (s) {window.make_request(s);} ;}
//setup the s.doPlugins callback
//this way we send our information *just* prior to sending the request


function make_request(s){
    var req = new XMLHttpRequest();
    req.open('POST', 'http://keystone-datapute-dev.nodejitsu.com/', true);
    base_obj = {'collector': collector, 'pageID': pageHash, 'last_s_call': s_i_homedepot.src};
    console.log(base_obj);
    req.send( JSON.stringify(base_obj) );
    console.log("We sent something with a hash of " + pageHash);
    console.log(base_obj);
}
