/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

google.maps.event.addDomListener(window, 'load', setup);

function setup() {
        // wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady() {
            // get device's geographical location and return it as a Position object (which is then passed to onSuccess)
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
}

var myLocMessage = '';

    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
var onSuccess = function(position) {
    var date = new Date(position.timestamp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var formattedTime = hours + ':' + minutes + ':' + seconds;
    myLocMessage = '';
    myLocMessage +='Hi, I\'m here: \n\n';
    myLocMessage += 'comgooglemaps://?q=' + position.coords.latitude + ',' + position.coords.longitude + '&zoom=12'+'\n\n';
    myLocMessage += 'Sent via AKI for iOS';
    console.log('\n' +
          'Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n' +
          'URL: '               + myLocMessage                          + '\n' +
          '***********');
};

    // onError Callback receives a PositionError object
    //
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


function myGetLocation (){
    var options = { maximumAge: 1000, timeout: 3000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

function mySendLocation (){
    var sendOptions = { maximumAge: 1000, timeout: 3000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, sendOptions);
    window.plugins.smsComposer.showSMSComposer('8322939907', myLocMessage);
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

            //listeningElement.setAttribute('style', 'display:none;');
            // receivedElement.setAttribute('style', 'display:block;');
        
        myGetLocation();
        
        console.log('Received Event: ' + id);
    }
};



