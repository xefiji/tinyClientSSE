# Context

Just a tiny SSE Js client, to work with https://github.com/xefiji/goSSE

# Use

```js
    //instantiate
    var client = new SSEClient("https://sse.serveradress.tld","sse");
    
    //set callback method that will handle every received events
    client.setCallback(function(event){
        console.log(event); //example
    })
    
    //with creds: not safe (for tests)
    client.withCreds("my_user","my_password", "my_user_id")
    
    // with token, generated server side, for example:
    var token = getTokenFromServer(); //custom function making a call to your own backend
    client.withToken(token, "my_user_id");     
```
