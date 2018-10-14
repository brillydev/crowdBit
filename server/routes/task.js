var express = require('express');
var router = express.Router();

var mongo = require('../mongo-init');
var exec = require('child_process').exec;
var zipFolder = require('zip-folder');
var fs = require('../fs-init');

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
    mongo.get_task(uri).then((data) => {
        data = data[0];

        exec('rm -rf ../storage/' + uri, (err, stdout, stderr) => {
            exec('mkdir -p ../storage/' + uri);
        });
        
        for (let i = 0; i < data.data.length; i++) {
            let filetype = data.data[i].type;
            fs.base64_decode(data.data[i].base64, uri, i.toString(), filetype);
        }

        // zipFolder(dest, dest + '.zip', (err) => {
        //     if (err) {
        //         console.log(err.toString());
        //     } else {
        //         (async () => {
        //             await res.sendFile(dest + '.zip', {root: '.'});
        //         }) ();
        //         exec('rm -rf ' + dest + '/zip');
        //     }
        // });
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

