var express = require('express');
var router = express.Router();

var mongo = require('../mongo-init');
var exec = require('child_process').exec;
var zipFolder = require('zip-folder');
var fs = require('../fs-init');
var path = require('path');

// GET /task - get a list of jsons of tasks with empty dataset 
router.get('/', function(req, res, next) {
    mongo.get_all_tasks().then((data) => {
        let num = Math.floor(Math.random() * (data.length + 1));
        res.render('index', { title: 'crowdBit', fake: num.toString()});
    });
});

// GET /task/all - get a list of jsons of all tasks 
router.get('/all', function(req, res, next) {
    res.json(mongo.get_all_tasks());
});

// GET /task/:name - download all files related to :name
router.get('/:name', function(req, res, next) {
    let uri = req.params.name.toString();
    mongo.get_task(uri).then((data) => {
        data = data[0];
        let dir = path.join(__dirname, '..', 'storage', uri);

        exec('rm -rf ' + dir, (err, stdout, stderr) => {
            exec('mkdir -p ' + dir, (err, stdout, stderr) => {
                for (let i = 0; i < data.data.length; i++) {
                    let filetype = data.data[i].type;
                    
                    fs.base64_decode(data.data[i].base64, uri, i.toString(), filetype);
                }

                zipFolder(dir, dir + '.zip', (err) => {
                    if (err) {
                        console.log(err.toString());
                    } else {
                        res.sendFile(dir + '.zip');
                    }
                });
            }
        )});
    });
});

// GET /task/create/:name - create an object called :name
router.get('/create/:name', function(req, res, next) {
    mongo.submit(req.params.name, "", []);
    res.json({success: 'yes'});
});

module.exports = router;

