#What's my lunch with PebbleJS and NodeJS

##The idea
I made a simple random lunch generator using JS and Firebase [https://github.com/ronniechong/js-whatsforlunch]

I came across the PebbleJS when I was at the Nodebots International Day [http://nodebotsau.io/] and one of the attendant demo'd me the PebbleJS API and CloudPebble IDE. That pique my interest and I thought I gave it a go making a Pebble app. So I decided to try using my simple Firebase + JS app as one example. This app was prototyped in a couple hours.

Basically, the app fires an Ajax request to a Node Server and returns a random lunch venue. That will then displayed on the watch.

In this instance I'm using my mobile as the bridge to communicate between the watch and the CloudPebble IDE

Pebble *---bluetooth--->* mobile phone *---internet/network--->* CloudPebble
and vice versa

**Note:** In this example, I'm using my local machine's IP (where my nodeJS resides) and both local machine and mobile phone need to be in the same local/Wifi network. Of course a tunnel or proxy service can replace this but I haven't got the chance to try that out then.

## Instructions

### Local machine
In your local machine, you will need NodeJS and Firebase

1. Firebase
```
npm install -D firebase
```

2. Run the app
```
node nodejs-app.js
```

###Pebble
1. Download the Pebble app in Android Playstore or iOS App Store
2. In the Pebble app, turn on the Developer Connection in Settings
3. The Developer option should appear in the left slide in menu.
4. In the Developer, make sure it is enabled.

###CloudPebble
1. Go to [https://cloudpebble.net]
2. Register yourself an account for CloudPebble. Your email should match the same account for your Pebble mobile app
3. Create a project and choose ```PebbleJS``` (beta) as Project Type
4. Go to ```app.js```
5. Include the ```var ajax = require('ajax');``` on top of the file
6. Assign your trigger. I used ```select``` for this example
```
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
```
7. Edit the IP address ```192.168.1.111``` and match it to your own local machine IP where the NodeJS app is running from. The port should be left as ```:8888```.
8. Click the Play button located on top right to save and compile.
9. Go to Compilation located at left side menu
10. Click on the Phone Tab
11. Click Run and Install. This will push the compiled app into your Pebble Watch via your mobile phone.
12. Watch the magic happens!

**Note:** The connection between CloudPebble and your Pebble app is flaky sometimes so you might have to try a few times before the connection is made and pushed.



