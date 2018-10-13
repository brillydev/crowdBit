var express = require('express');
var router = express.Router();

var firebase = require('../firebase-init');
var exec = require('child_process').exec;

// PUT /submit/:name - upload a file related to :name
router.put('/:name', function(req, res, next) {
    let uri = req.params.name.toString();
    let dest = '../storage/' + uri;
    let host = 'datalyzer-63388.appspot.com';
    
    let content = await exec("../gsutil/gsutil -m cp -r gs://" + 
                                host + '/' +
                                uri + ' ' + 
                                dest);
});

// GET /task/create/:name - create an object called :name
router.get('/create/:name', function(req, res, next) {
    let db = firebase.db;
    let docRef = db.collection('objects').doc(req.params.name);

    let setObject = docRef.set({
        url: []
      });
});

module.exports = router;

