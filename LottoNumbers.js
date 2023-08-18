var express = require('express');
let Draw = require(`./models/draw,model`);

var router = express.Router();
let ScrapeData = require('./Scrapper')
router.get('/', function(req,res,next){
    let purDate = req.body.purDate;
    let plays = req.body.plays;
    Draw.find({rawDate:{$gt: purDate}}).sort({'rawDate': 1}).limit(plays).then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get('/updateRecent',function(req,res,next){
    const link = 'https://www.wclc.com/winning-numbers/lotto-max-extra.htm';
    ScrapeData(link).then((value)=>{
        Draw.find({}).select('rawDate').then((dates)=>{
            let parsedDates = dates.map((x)=> x.rawDate);
            value.forEach((x)=>{
                if(!parsedDates.includes(x.rawDate)){
                    const lottoDate = new Draw(x);
                    lottoDate.save()
                }
            })
        })
    }).then(()=> res.json("done"))
    
    
})
router.get('/update',function(req,res,next){
    let link = req.body.link;
    console.log("running update")
    ScrapeData(link).then((value)=>{
        Draw.find({}).select('rawDate').then((dates)=>{
            let parsedDates = dates.map((x)=> x.rawDate);
            value.forEach((x)=>{
                if(!parsedDates.includes(x.rawDate)){
                    console.log(x);
                    const lottoDate = new Draw(x);
                    lottoDate.save()
                }
            })
        })
    }).then(()=> res.json("done"))
    
    
})
module.exports = router;