const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
    apiKey: eb6e14b7d5034fc9b6593e8d31647d30
});

exports.clarifaiApp = clarifaiApp;