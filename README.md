
File uploader
------------------------------------------------------
### RUN

### Installation
```sh
$ npm install
$ npm start
```
in another terminal
```sh
$ node watcher.js -h localhost -p 3000
```
 get session-id from that and run script for uploading a file
```sh
$ node client.js -h localhost -f  /path/to/file -p 3000 -s <session-id>
```

Also you can make a lot of watchers and clients. For adding one more client you have to use -s param. like this
```sh
$ node watcher.js -h localhost -p 3000 -s <session-id>
```

If you will upload more than one file on one time it will be working :)

### Test
```sh
$ npm run test
```

### Application structure
```
server.js
watcher.js
client.js
 /etc
 /tests
 /lib
    /routes
    /services
    File.js
    FileUploader.js
    UploadSession.js
```

**/etc** - config files.

**/server.js** - main file with http server.

**/watcher.js** - script that connecting to server by the websocket and monitoring uploading status.

**/client.js** - script that uploading file to the server.

**/tests** - test files.

**/lib** - contains application source code.

**/lib/routes** - routes.

**/lib/services** - business logic of application.

**/lib/File.js || FileUploader.js || UploadSession.js** - logic of uploading.


