var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', id: 'dog' });
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
