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
function SSEClient(url, event, user, password, id) {

	this.url = url;
	this.event = event;
	this.user = user;
	this.password = password;
	this.id = id;

	// the handler function that will be called  to do something with the event
	this.setCallback = function (callback) {
		this.callback = callback;
	};

	//build a json with user's datas
	this.buildLoginPayload = function () {
		var data = {};
		data.username = this.user;
		data.password = this.password;
		data.id = this.id;
		return JSON.stringify(data);
	};

	//logs in, then when its logged (hence cookie set), instanciate an EventStream object
	this.run = function () {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", this.url + "/login", true);
		xhr.withCredentials = true;
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send(this.buildLoginPayload());

		var url = this.url;
		var eventType = this.event;
		var callback = this.callback;
		xhr.addEventListener("loadend", function (event) {
			const evtSource = new EventSource(url + "/events?type=" + eventType, {withCredentials: true});
			evtSource.onmessage = function (event) {
				callback(event)
			};
		}, false);
	};
};

</script>
