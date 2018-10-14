var express = require('express');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime-types');
var router = express.Router();

var clarifai = require('../clarifai-init');
var fs = require('../fs-init');
var mongo = require('../mongo-init');

var filetype;
var exec = require('child_process').exec;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },

    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
        filetype = mime.extension(file.mimetype);
        cb(null, raw.toString('hex') + Date.now() + '.' + filetype);
      });
    }
});
var upload = multer({ storage: storage });


// post /submit/ - upload a file related to name (uri variable)
router.post('/', upload.array('objects'), function(req, res, next) {
    let uri = req.params.id;
    
    for (let obj of req.files) {
        let base64str = fs.base64_encode(obj.path);
        clarifai.clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, {
            base64: base64str
        })
        .then(res => {
            
            for (let category of res.outputs[0].data.concepts) {
                if (uri == category.name) {
                    // upload to mongo
                    mongo.submit(uri, filetype, base64str)
                } else {
                    // TODO: if we have time, redirect to user for verification
                }
            }
            res.json({success: 'yes'});
        },
            (err) => { 
                res.json({success: 'no'});
                console.log(err.toString()); 
            }
        )
    }
    
});

module.exports = router;

