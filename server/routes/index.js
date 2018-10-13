var express = require('express');
var router = express.Router();

// firebase
var admin = require('firebase-admin');
var serviceAccount = require('../firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://datalyzer-63388.appspot.com",
  databaseURL: "https://datalyzer-63388.firebaseio.com"
});

var db = admin.firestore();
var bucket = admin.storage().bucket();

var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getNextTask', function (req, res, next) {
  if (req.firebaseID) {
    var tasks = db.collection('task');
    var query = tasks.where('usersCompleted', 'array_contains', req.firebaseID);
    query.get.then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      })
    })
    res.json({})
  } else {
    res.json({status: "error", "error": "User not logged in."});
  }
})

module.exports = router;
