 // date variables
        
         var url='http://127.0.0.1:8080'; 

         var clientId = '913431985197-po8ecu9iehukd6838kd1nep04rjf2plc.apps.googleusercontent.com';
        var apiKey = 'AIzaSyC0NsVoOOaIH5DnCPn0a86po1S8Pp2zk48';

         var scopes = 'https://www.googleapis.com/auth/calendar';

         function handleClientLoad() {
            gapi.client.setApiKey(apiKey);
            window.setTimeout(checkAuth, 1);
        }

        function checkAuth() {
            gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
         }

         function handleAuthResult(authResult) {
            var authorizeButton = document.getElementById('authorize-button'); 
        var eventButton = document.getElementById('btnCreateEvents');
        var btnsync = document.getElementById('btnsync');

            if (authResult && !authResult.error) {
                authorizeButton.style.visibility = 'hidden';  
                eventButton.style.visibility = 'visible';        // if authorized, hide button
                eventButton.onclick = makeApiCall;
                btnsync.style.visibility = 'visible';        // if authorized, hide button
                btnsync.onclick = SyncEvent;
                 
            } else {                                                    // otherwise, show button
                authorizeButton.style.visibility = 'visible';
                authorizeButton.onclick = handleAuthClick;          // setup function to handle button click
            }
        }

        // function triggered when user authorizes app
        function handleAuthClick(event) {
            gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false }, handleAuthResult);
            return false;
        }
 
         //to Add events to Google Calendar
         function makeApiCall() {
         var succ=false;
            $.ajax({
        type: "GET",
        //data: postdata,
        url: url+"/Event",
          success: function (data, textStatus, jqXHR) {

            for(var i=0; i<data.length;i++){
                var ds= new Date(data[i].date_start);
                var de= new Date(data[i].date_end);
                var dstart= ds.getFullYear()+"-"+parseInt(ds.getMonth()+1)+"-"+ds.getDate();
                var dend= de.getFullYear()+"-"+parseInt(de.getMonth()+1)+"-"+de.getDate();
                    var resource = {
            "summary": "Mobile Cloud Computing",
            "start": {
                "date": dstart
            },
            "end": {
                "date": dend
            },
            "description": data[i].description,
            "location": data[i].place 
        };

              gapi.client.load('calendar', 'v3', function () {                    // load the calendar api (version 3)
                var request = gapi.client.calendar.events.insert
                ({
                    'calendarId': 'azmaktr@gmail.com', // calendar ID
                    "resource": resource                            // pass event details with api call
                });
                
                // handle the response from our api call
                request.execute(function (resp) {
                    if (resp.status == 'confirmed') {
                         succ=true;
                     } else {
                     }
                });
            });
            }
                    },
        beforeSend: function (xhr) {
         },
        error: function (errorMessage) {
            alert("there is something wrong connecting to the server");
            console.log(errorMessage);
        }
    });

        if(succ){
            alert("done");
        }   
        }
        

        // FUNCTION TO Syncc events
       function SyncEvent() {
        var ds=new Date("2015-10-01");
        ds=ds.toISOString();
        var de=new Date("2015-12-31");
        de=de.toISOString();
         gapi.client.load('calendar', 'v3', function() {  
            var req = {
                'calendarId': 'azmaktr@gmail.com',
                "start": {
                    "dateTime":  de
                },
                "end": {
                    "dateTime":  ds //startDateMin.toISOString()
                }
           };
           var request = gapi.client.calendar.events.list(req);
         request.execute(function(resp) {

            for(var i=0; i<resp.items.length; i++){
                

                var postdata={
                    "description" : resp.items[i].description,
                    "user_id" : "5623a9cbc99b1b623b810c8a",
                    "date_end" : Date(resp.items[i].end),
                    "date_start" : Date(resp.items[i].start),
                    "place" : resp.items[i].location,
                    "ispublic" : true
                 }; 
                  $.ajax({
                type: "POST",
                data: postdata,
                            dataType: "json",
                url: url+"/Event/",
                  success: function (data, textStatus, jqXHR) {
                    console.log(data);                            
                },
                beforeSend: function (xhr) {
                  },
                error: function (errorMessage) {
                    alert("there is something wrong connecting to the server");
                    console.log(errorMessage);
                }
              });
            }            
         });
         });
       } 
 

        