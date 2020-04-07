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

        // the handler function that will be called  to do something with the event
        this.setCallback = function (callback) {
            this.callback = callback;
        };

        //warning: data passes clearly in the request!
        this.withCreds = function (user, password, id) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.url + "/creds_login", true);
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
            //set cookie
            document.cookie = "sse_token=" + encoded;
            //callrun
            this.run(this.url, this.event, this.callback);
        };

        //after logged in (hence cookie set), instanciate an EventStream object
        this.run = function (url, eventType, callback) {            
            const evtSource = new EventSource(url + "/events?type=" + eventType, { withCredentials: true });        
            evtSource.onmessage = function (event) {
                callback(event)
            };
        };

    };

</script>
