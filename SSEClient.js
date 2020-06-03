<script>
	
/**
 *
 * @param url
 * @param event
 * @param user
 * @param password
 * @param id
 * @constructor
 */
function SSEClient(url, event) {

        this.url = url;
        this.event = event;
	this.es;

        // the handler function that will be called  to do something with the event
        this.setCallback = function (callback) {
            this.callback = callback;
        };

        //warning: data passes clearly in the request!
        this.withCreds = function (user, password, id) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.url + "/login", true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-type', 'application/json');

            var data = {};
            data.username = user;
            data.password = password;
            data.id = id;

            xhr.send(JSON.stringify(data));
            var url = this.url;
            var eventType = this.event;
            var callback = this.callback;

            var run = this.run;
            var eventType = this.event;
            var url = this.url;
            var callback = this.callback;
            xhr.addEventListener("loadend", function (event) {
                run(url, eventType, callback);
            }, false);
        };

        //use this if token was generated server side
        this.withToken = function (token, id) {
            //encode token
            var data = {}
            data.token = token;
            data.id = id;
            var encoded = btoa(JSON.stringify(data));
            
            //callrun
            this.run(this.url, this.event, this.callback, encoded);
        };

        //after logged in, instanciate an EventStream object
        this.run = function (url, eventType, callback, token) {
            var finalUrl = url + "/events?type=" + eventType;
            if (token) {
	        finalUrl += "&token=" + token;
	    }
	    const evtSource = new EventSource(finalUrl, {withCredentials: true});
	    evtSource.onmessage = function (event) { //this will be called by default if no event type is set
	        callback(event)
	    };
	    this.es = evtSource; //if you need to add listeners to specific event type
        };

    };

</script>
