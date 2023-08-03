var express = require('express');
var router = express.Router();
let ScrapeData = require('./Scrapper')
router.get('/', function(req,res,next){
    ScrapeData().then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;