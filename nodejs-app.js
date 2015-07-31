var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    firebase = require('firebase'),
    dataRef = new firebase('https://js-whatsforlunch.firebaseio.com/');

http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    if (path=='/getstring'){
        response.writeHead(200, {'Content-Type': 'text/plain'});

        //Firebase API
        dataRef.on("value", function(snapshot) {
            var arr         = [],
                fbItems     = snapshot.val();
            for (var prop in fbItems) {
                arr.push(fbItems[prop]);
            }

            var rand = Math.floor(Math.random() * (arr.length - 1  + 1));
            console.log('Recommended lunch' +arr[rand]);
            response.end(arr[rand]);
        });

    }else{
        // DO nothing
    }
}).listen(8888);
console.log("server initialized");