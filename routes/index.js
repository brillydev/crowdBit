var express = require('express');
var router = express.Router();

// firebase
var admin = require('firebase-admin');
var serviceAccount = require('firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://datalyzer-63388.firebaseio.com"
});

var db = admin.firestore();

var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
