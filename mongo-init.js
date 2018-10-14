const {  
    Stitch, 
    AnonymousCredential,
} = require('mongodb-stitch-server-sdk');
 
const client = Stitch.initializeDefaultAppClient('datalyzer-kszwl');

client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
    client.callFunction("submit_obj", ["orange", "text", "aaaaaaa"]).then(result => console.log(result));
    client.close();
}).catch(err => {
    console.log(err);
    client.close();
})