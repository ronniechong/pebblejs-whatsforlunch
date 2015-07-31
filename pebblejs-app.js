var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'What\'s for lunch?',
  body: '',
  scroll:true
});

main.show();

//I'm using select to trigger
main.on('click', 'select', function(e) {
    var card = new UI.Card();
    card.title('Today\'s suggestion');

    //Using local network
    //You can use a proxy or tunneling service
    ajax({url: "http://192.168.1.111:8888/getstring"},
      function(str) {
        main.body(str);
        main.show();
      },
      function(error) {
        console.log('Ajax failed: ' + error);
      }
    );
});

