# QRCodeTrackingService.js
A node.js micro service for generating QR codes with embedded activation codes (tracking codes).

*Example Use*
POST to [localhost:8080/users/anders](http://localhost:8080/users/anders). 
A QR code will be returned with an embedded hash code, which can be used for activation of a user account for example.

The user records are stored in an SQLLite database in ```./dbfiles``` 
The location of the databse is configurable. See the ```./config``` folder.

*Features*
- Generate QR code as SVG (using package qr-image)
- Application life-cycle management
    * Pre-start setup hook
    * Shutdown hook on 'SIGINT' and 'SIGTERM' for pre-exit cleanup or data saving.
- Logging using [log4js](https://github.com/nomiddlename/log4js-node)
    * Config includes both rotating file and console logging
- Application config injection
    * Simple pattern for injecting config and logger info in modules (see `routes/qrCodeGenerator.js` for example)
- Built in form parsing with Formidable
    * Example includes file upload form
- Example test cases 
    * Using [Mocha](http://visionmedia.github.io/mocha/) and [Should](https://github.com/visionmedia/should.js/)

## Install
First clone/save this repo

    cd QRCodeTrackingService.js
    mkdir logs
    mkdir dbfiles
	npm install

## Dev mode run
Automatically restart on file change, using nodemon

```npm run dev-start```

## Run
	```npm start```

## Run tests
	```npm test```

### Integration tests
	```npm run e2e```

	