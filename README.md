Proof of concept for bug report in webpack-dev-server

* Shows that webpack-dev-server@3.1.1 works
* Shows that webpack-dev-server@3.1.2 does not work

# How to use

## Hot reload working

```
npm install webpack-dev-server@3.1.1
npm run poc
```

Edit a file and see the changes.

# Hot reload not working

```
npm install webpack-dev-server@3.1.2
npm run poc
```

Browser crashes the app with

```
only-dev-server.js:9 Uncaught TypeError: Cannot read property 'indexOf' of undefined
    at upToDate (only-dev-server.js:9)
    at EventEmitter.<anonymous> (only-dev-server.js:87)
    at EventEmitter.push../node_modules/events/events.js.EventEmitter.emit (events.js:81)
    at reloadApp (client?56b6:226)
    at Object.ok (client?56b6:139)
    at SockJS.onmessage (socket.js:41)
    at SockJS.EventTarget.dispatchEvent (sockjs.js:170)
    at sockjs.js:883
    at Array.forEach (<anonymous>)
    at SockJS._transportMessage (sockjs.js:881)
```
