var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime-types');
var router = express.Router();

var clarifai = require('../clarifai-init');
var helper = require('../helper');

var firebase = require('../firebase-init');
var exec = require('child_process').exec;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },

    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    }
});
var upload = multer({ storage: storage });

// post /submit/:name - upload a file related to :name
router.post('/:name', upload.array('objects'), function(req, res, next) {
    let uri = req.params.name.toString();
    
    for (let obj of req.files) {
        let base64str = helper.base64_encode(obj.path);
        clarifai.clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, {
            base64: base64str
        })
        .then(res => {
            
            for (let category of res.outputs[0].data.concepts) {
                console.log(category);
                if (uri == category.name) {
                    
                    // upload to GCS
                    (async () => {
                        await firebase.storage.bucket('objects').upload(obj.path, {
                            gzip: true
                        });
                    }) ();

                    // rename file in GCS to appear "in folder"
                    (async () => {
                        await firebase.storage.bucket('objects')
                                .file(obj.filename)
                                .move(category.name + '/' + obj.filename);
                    }) ();
                    
                } else {
                    // TODO: if we have time, redirect to user for verification
                }
            }
        },
            (err) => { console.log(err.toString()); }
        )
    }
    
});

module.exports = router;

