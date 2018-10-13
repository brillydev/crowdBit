var admin = require('firebase-admin');
var serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://datalyzer-63388.appspot.com",
  databaseURL: "https://datalyzer-63388.firebaseio.com"
});

exports.db = admin.firestore();
exports.bucket = admin.storage().bucket();
exports.oauth_token = 'Bearer ya29.Gls1BmiYtopVkhCBDFlImZSrlXmhx3naPQ1p-wv4dWocza32sbJCa7WT2ZEczYHc4ejPrYxeRcIIvtCJQo99nbX8kEW2fNzGUdlQvCOe4OrqtZUTWBbZaK8hihiI';