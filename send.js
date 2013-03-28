//requires https://raw.github.com/LiosK/UUID.js/master/src/uuid.core.js to be placed before it
//also requires <script src="http://sinonjs.org/releases/sinon-1.6.0.js"></script>
//only checks for omniture beacons on first run...
var collector = window._hddata;
pageHash = UUID.generate(); //a unique pageHash to corelate omniture results with collector items.

var existingBeacons = [];

function check_for_beacons(){
    if (window.opener.document.images) {
           for (var image_num = 0;image_num < window.opener.document.images.length;image_num++) {
                   var src = window.opener.document.images[image_num].src;
                   if (src.indexOf('/b/ss/') >= 0) { 
                       //found an omniture beacon on the page
                       //let's check to see if this beacon already existed...
                       var beaconURLCount = 0;
                       for (var j = 0; j < existingBeacons.length; j++) {
                            if (existingBeacons[j].src === src) {
                                beaconURLCount++;
                            }
                       }
                       if (beaconURLCount === 0) {
                            //this beacon is a unique snowflake
                            //let's send it off
                            existingBeacons.append(src);
                            make_request(src);
                       }
                       else {
                            console.log("There was a duplicate beacon, as the same beacon URL was recorded" + beaconURLCount + " times.");
                       }
                   }
           }
    }
}

var spy = sinon.spy(s, "tl");
spy.setPostExecutionCallback(check_for_beacons); //send the collector after the a trackLink event


function make_request(omniture_src){
    var req = new XMLHttpRequest();
    req.open('PUT', 'http://keystone-datapute-dev.nodejitsu.com/', true);
    prelim = JSON.parse( JSON.stringify(collector) );
    prelim['pageID'] = pageHash;
    prelim['omniture_src'] = omniture_src;
    req.send( JSON.stringify(prelim) );
    console.log("We sent something with a hash of " + pageHash);
}


//options for seeing beacons earlier
//http://stackoverflow.com/questions/4780822/how-can-i-detect-when-a-new-element-has-been-added-to-the-document-in-jquery
//http://docs.jquery.com/Plugins/livequery
//http://sinonjs.org/docs/#spies

