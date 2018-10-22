# crowdBit

### Crowdsourcing data made simple.

crowdBit is a platform that lets users all over the world contribute to new and existing datasets by uploading their own files. crowdBit then filters them out for relevance through Clarifai machine learning model, and discards the files that do not accurately represent the dataset. Each dataset can be downloaded in a nicely zipped format. 

### Set-up
```
npm install
npm start
```
### General how-it-works
Right now, crowdBit converts every file submitted to base64 format and send them to Clarifai to sort relevance. All of the uploaded files contain a "keyword" that specifies what the files are about. Only files whose keyword match that of Clarifai's will be stored in MongoDB Atlas in base64 format. For ease of development, we have a local node server that calls functions in MongoDB Stitch to execute our database operations.

### Improvement plan
- Switch from converting files back and forth into base64 format, just dump the files in AWS or GCP
- Support for other file types
- Implement web interface and make PWA
- Make native Android and iOS support
