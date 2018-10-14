const {  
    Stitch, 
    AnonymousCredential,
} = require('mongodb-stitch-server-sdk');

const client = Stitch.initializeDefaultAppClient('datalyzer-kszwl');

function submit(name, type, base64) {
    client.auth.loginWithCredential(new AnonymousCredential())
    .then(user => {
        client.callFunction("submit_obj", [name, type, base64])
        .then(result => {
            console.log(result)
        });

        client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    })
}

exports.submit = submit;