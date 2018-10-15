var express = require('express');
var router = express.Router();
var mongo = require('../mongo-init');

/* GET home page. */
router.get('/', function(req, res, next) {
    mongo.get_all_tasks().then((data) => {
      let num = Math.floor(Math.random() * (data.length + 1));

      if (num === undefined || num === NaN) {
          num = 0;
      }

      res.render('index', { title: 'crowdBit', fake: data[num].name});
  });
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
