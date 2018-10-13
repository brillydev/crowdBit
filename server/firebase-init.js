var admin = require('firebase-admin');
var serviceAccount = require('./firebase-key.json');

const {Storage} = require('@google-cloud/storage');
const projectId = 'datalyzer-63388';
const storage = new Storage({
  projectId: projectId,
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "datalyzer-63388.appspot.com",
  databaseURL: "https://datalyzer-63388.firebaseio.com"
});

exports.db = admin.firestore();
exports.storage = storage;
exports.oauth_token = 'Bearer ya29.Gls1BmiYtopVkhCBDFlImZSrlXmhx3naPQ1p-wv4dWocza32sbJCa7WT2ZEczYHc4ejPrYxeRcIIvtCJQo99nbX8kEW2fNzGUdlQvCOe4OrqtZUTWBbZaK8hihiI';

