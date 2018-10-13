var express = require('express');
var router = express.Router();

var firebase = require('../firebase-init');
var exec = require('child_process').exec;
var zipFolder = require('zip-folder');

// GET /task/:name - download all files related to :name
router.get('/:name', function(req, res, next) {
    let uri = req.params.name.toString();
    let dest = '../storage/' + uri;
    let host = 'datalyzer-63388.appspot.com';
    
    let content = await exec("../gsutil/gsutil -m cp -r gs://" + 
                                host + '/' +
                                uri + ' ' + 
                                dest);

    zipFolder(dest, dest + '.zip', (err) => {
        if (err) {
            console.log(err.toString());
        } else {
            await res.sendFile(dest + '.zip', {root: '.'});
            exec('rm -rf ' + dest + '/zip');
        }
    });
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

