const axios = require("axios");
const cheerio = require( 'cheerio');

async function ScrapeData(){
    try {
        const url = 'https://www.wclc.com/winning-numbers/lotto-max-extra.htm';

        const {data} =  await axios.get(url);

        let $ = cheerio.load(data);
        let parsed = [];
        $(".pastWinNum").each((_, e) => {
            let temp = [];
            let bonusNum = -1;
            $(e).children(".pastWinNumGroup").children(".pastWinNumbers").children("li").each((_,el)=>{
                let num = parseInt($(el).text().replace("Bonus",""))
                if(temp.length <= 6)temp.push(num);
                else bonusNum = num;
            });
            MaxMillionNums = [];
            let date = $(e).children(".pastWinNumGroup").children(".pastWinNumDate").children("h4").text().replaceAll("\n", "").replaceAll("\t","");
            
            $(e).find(".pastWinNumMMGroup").children("ul").each((_,MMN)=>{
                let temp2 = [];
                console.log(MMN);
                $(MMN).children("li").each((_,MMNN)=>{
                    temp2.push(parseInt($(MMNN).text()));
                })
                MaxMillionNums.push(temp2);
            })
            parsed.push({date,bonusNum, Number: temp, MaxMillionNums});
        })
        return(parsed);
    }catch(err){
        console.error(err);
    }
}

module.exports = ScrapeData;



