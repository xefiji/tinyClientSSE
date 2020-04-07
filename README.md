# Context

Just a tiny SSE Js client, to work with https://github.com/xefiji/goSSE

# Use

```js
    //instantiate
    var client = new SSEClient("https://sse.serveradress.tld","sse","my_user","my_password", "my_user_id");
    
    //set callback method that will handle every received events
    client.setCallback(function(event){
        console.log(event); //example
    })
    
    //run (will log in and run EventStream)
    client.run();
```
