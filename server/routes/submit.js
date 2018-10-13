var express = require('express');
var multer = require('multer');
var bodyparser = require('body-parser');
var router = express.Router();

var clarifai = require('../clarifai-init');
var helper = require('../helper');

var firebase = require('../firebase-init');
var exec = require('child_process').exec;
var upload = multer({ dest: 'uploads/'});

// post /submit/:name - upload a file related to :name
router.post('/:name', upload.array('objects'), function(req, res, next) {
    let uri = req.params.name.toString();

    for (let obj of req.files) {
        obj.path
    }
    
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

