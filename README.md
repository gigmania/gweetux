
## gweetux
gweetux is a simple web app that that enables a user to browse issues for any public github repository.  Simply enter a github user/repo (e.g. twitter/typeahead.js).

### Getting set up locally
* Download & Install Node.js (http://www.nodejs.org/download/) and the npm package manager.
* In the gweetux root directory, enter the following command in the terminal.

```
$ npm install
```

### Running gweetux locally
* When the npm install process is complete, enter the following command in the terminal to run the app.

```
$ npm start
```
gweetux runs on port 3000.  Go to [http://localhost:3000](http://localhost:3000) to begin playing around with it.

### Running gweetux tests
* gweetux tests are currently limited, but to run them simply enter the following command in the terminal.

```
$ npm test
```

### Thanks to
* Rackt for Redux [https://github.com/rackt/redux]
* gaearon for Redux Thunk [https://github.com/gaearon/redux-thunk] and Normalizr [https://github.com/gaearon/normalizr]
