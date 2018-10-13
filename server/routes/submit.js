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
        let base64str = helper.base64_encode(obj);
        clarifai.clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, {
            base64: base64str
        })
        .then(res => {
            res = JSON.parse(res);
            

            for (let category of res.data.concepts) {
                if (uri == category.name) {

                    // upload to GCS
                    await firebase.bucket('objects').upload(obj.path, {
                        gzip: true
                    });

                    // rename file in GCS to appear "in folder"
                    await firebase.bucket('objects')
                                    .file(obj.filename)
                                    .move(category.name + '/' + obj.filename);
                } else {
                    // TODO: if we have time, redirect to user for verification
                }
            }
        },
            (err) => { console.log(err.toString()); }
        )
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

