var express = require('express');
var router = express.Router();

var firebase = require('../firebase-init');
var exec = require('child_process').exec;
var zipFolder = require('zip-folder');

// GET /task - get a list of jsons of tasks with empty dataset 
router.get('/', function(req, res, next) {
    let db = firebase.db;
    let docRef = db.collection('objects');

    var query = docRef.where('url', '==', []).get()
                .then(snapshot => {
                    res.json(snapshot);
                })
                .catch(err => {
                console.log('Error getting documents', err);
                });
});

// GET /task/all - get a list of jsons of all tasks 
router.get('/all', function(req, res, next) {
    let db = firebase.db;
    let docRef = db.collection('objects');

    var query = docRef.get()
                .then(snapshot => {
                    res.json(snapshot);
                })
                .catch(err => {
                console.log('Error getting documents', err);
                });
});

// GET /task/:name - download all files related to :name
router.get('/:name', function(req, res, next) {
    let uri = req.params.name.toString();
    let dest = '../storage/' + uri;
    let host = 'datalyzer-63388.appspot.com';

    (async () => {
        await exec("../gsutil/gsutil -m cp -r gs://" + 
                    host + '/' +
                    uri + ' ' + 
                    dest);
    })();
    

    zipFolder(dest, dest + '.zip', (err) => {
        if (err) {
            console.log(err.toString());
        } else {
            (async () => {
                await res.sendFile(dest + '.zip', {root: '.'});
            }) ();
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

