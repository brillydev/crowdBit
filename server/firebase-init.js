var admin = require('firebase-admin');
var serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://datalyzer-63388.appspot.com",
  databaseURL: "https://datalyzer-63388.firebaseio.com"
});

var db = admin.firestore();
var bucket = admin.storage().bucket();