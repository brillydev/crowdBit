var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, name, outname, filetype) {
    fs.writeFile(__dirname + '/storage/' + name + '/' + outname + "." + filetype, 
                base64str, 
                'base64', 
                function(err) {
                    console.log(err);
    });
}

exports.base64_encode = base64_encode;
exports.base64_decode = base64_decode;
exports.createWriteSteam = fs.createWriteStream;