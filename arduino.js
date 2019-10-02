var five = require("johnny-five"), photoresistor;
var board = new five.Board();
var PubNub = require('pubnub');

//PubNub subscription keys
var pubnub = new PubNub({
    publish_key: "pub-c-cb9f9ce1-9c09-45f8-9de5-6bc8a741c305",
    subscribe_key: "sub-c-0615df70-6d28-11e9-a1d6-2a8c316da507"
});

var channel = 'arduinoweb';
var light = 0;

function publish() {
    var data = {
        'light': light
    };
    pubnub.publish({
        channel: channel,
        message: data,
    });
}

//johnny-five arduino controlling function
board.on("ready", function () {
    // Create a new `photoresistor` hardware instance.
    photoresistor = new five.Sensor({
        pin: "A2",
        freq: 250
    });
    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
        pot: photoresistor
    });
    // "data" get the current reading from the photoresistor
    photoresistor.on("data", function () {
        console.log('photoresistor: ' + this.value);
        light = this.value;
    });
    //setting time interval of 3 seconds 
    setInterval(publish, 3000);

    //Pins used
    var pinA = new five.Pin(3);
    var pinF = new five.Pin(4);
    var pinE = new five.Pin(5);
    var pinD = new five.Pin(6);
    var pinC = new five.Pin(8);
    var pinG = new five.Pin(9);
    var pinB = new five.Pin(10);

    var channel = 'arduinoweb';

    var array = new five.Leds([11, 12, 13]);

    pubnub.subscribe({
        channels: [channel]
    });

    pubnub.addListener({
        message: function (message) {
            if (message.message.buttonColor === 'red') {
                array.on();
            }
            else if (message.message.buttonColor === 'off') {
                array.stop();
                array.off();

            }
            else if (message.message.buttonColor != null) {
                if (message.message.buttonColor === "0") {
                    pinA.low();
                    pinB.low();
                    pinC.low();
                    pinD.low();
                    pinE.low();
                    pinF.low();
                    pinG.high();
                }
                else if (message.message.buttonColor === "1") {
                    pinA.high();
                    pinB.high();
                    pinC.high();
                    pinD.high();
                    pinE.low();
                    pinF.low();
                    pinG.high();
                }
                else if (message.message.buttonColor === "2") {
                    pinA.low();
                    pinB.low();
                    pinC.high();
                    pinD.low();
                    pinE.low();
                    pinF.high();
                    pinG.low();
                }
                else if (message.message.buttonColor === "3") {
                    pinA.low();
                    pinB.high();
                    pinC.high();
                    pinD.low();
                    pinE.low();
                    pinF.low();
                    pinG.low();
                }
                else if (message.message.buttonColor === "4") {
                    pinA.high();
                    pinB.high();
                    pinC.low();
                    pinD.high();
                    pinE.low();
                    pinF.low();
                    pinG.low();
                }
                else if (message.message.buttonColor === "5") {
                    pinA.low();
                    pinB.high();
                    pinC.low();
                    pinD.low();
                    pinE.high();
                    pinF.low();
                    pinG.low();
                }
                else if (message.message.buttonColor === "6") {
                    pinA.low();
                    pinB.low();
                    pinC.low();
                    pinD.low();
                    pinE.high();
                    pinF.low();
                    pinG.low();
                }
                else if (message.message.buttonColor === "7") {
                    pinA.high();
                    pinB.high();
                    pinC.high();
                    pinD.low();
                    pinE.low();
                    pinF.low();
                    pinG.high();
                }
                else if (message.message.buttonColor === "8") {
                    pinA.low();
                    pinB.low();
                    pinC.low();
                    pinD.low();
                    pinE.low();
                    pinF.low();
                    pinG.low();
                }
                else if (message.message.buttonColor === "9") {
                    pinA.low();
                    pinB.high();
                    pinC.low();
                    pinD.low();
                    pinE.low();
                    pinF.low();
                    pinG.low();
                }
            }
            else {
                array.stop();
            }
            console.log(message.message.buttonColor);
        },
        error: function (err) {
            console.log(err);
        }
    });
});
