//requires https://raw.github.com/LiosK/UUID.js/master/src/uuid.core.js to be placed before it
//only checks for omniture beacons on first run...
var collector = window._hddata;
pageHash = UUID.generate(); //a unique pageHash to corelate omniture results with collector items.

function check_for_beacons(){
    if (window.opener.document.images) {
	    for (var image_num = 0;image_num < window.opener.document.images.length;image_num++) {
		    var src = window.opener.document.images[image_num].src;
		    if (src.indexOf('/b/ss/') >= 0) {
                //found an omniture beacon on the page
                make_request(src);
		    }
	    }
    }
}

function make_request(omniture_src){
    var req = new XMLHttpRequest();
    req.open( 'PUT', 'http://127.0.0.1:1337/', true);
    prelim = JSON.parse( JSON.stringify(collector) );
    prelim['pageID'] = pageHash;
    prelim['omniture_src'] = omniture_src;
    req.send( JSON.stringify(prelim) );
    console.log("We sent something with a hash of " + pageHash);
}

check_for_beacons(); //check for beacons

//options for seeing beacons earlier
//http://stackoverflow.com/questions/4780822/how-can-i-detect-when-a-new-element-has-been-added-to-the-document-in-jquery
//http://docs.jquery.com/Plugins/livequery
//http://sinonjs.org/docs/#spies

