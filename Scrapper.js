const axios = require("axios");
const cheerio = require( 'cheerio');

async function ScrapeData(url){
    try {
        //const url = 'https://www.wclc.com/winning-numbers/lotto-max-extra.htm';

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
            let MaxMillionNums = [];
            let months = ["", "january","feburary", "march", "april", "may","june", "july", "august", "september", "october","november", "december"]
            let date = $(e).children(".pastWinNumGroup").children(".pastWinNumDate").children("h4").text().split("\n").join("").split("\t").join("");
            let rawDateData = date.split(", ");
            let month = months.indexOf(rawDateData[1].split(" ")[0].toLowerCase());
            let day = rawDateData[1].split(" ")[1];
            let year = rawDateData[2];
            console.log(year+"."+month+"."+day);
            let parsedTime = new Date(year+"."+month+"."+day).getTime();
            $(e).find(".pastWinNumMMGroup").children("ul").each((_,MMN)=>{
                let temp2 = [];
                //console.log(MMN);
                $(MMN).children("li").each((_,MMNN)=>{
                    temp2.push(parseInt($(MMNN).text()));
                })
                MaxMillionNums.push(temp2);
            })
            let prizeLink = $(e).find(".pastWinNumPrizeBreakdown").attr("rel");
            

            parsed.push({rawDate:parsedTime,date,bonusNum, number: temp, MaxMillionNums,prizeLink});
        })

        for(let i = 0;i< parsed.length;i++){
            let day = parsed[i]
            const {data} = await axios.get("https://www.wclc.com" + day.prizeLink);
            let winnings = [];
            let p = cheerio.load(data);
            p(".prizeBreakdownTable.prizeBreakdownLottoMax").find("tr").each((_,el)=>{
                winnings.push(p(el).find("td").text());
            })
            //console.log(winnings.length);
            let winningsParsed = [];
            for(let j = 0;j<winnings.length;j++){
                winningsParsed.push(winnings[j].replaceAll("\n","").split("$")[1])
            }
            //console.log(winningsParsed)
            parsed[i] = {...parsed[i], prizeDis: winningsParsed};
            // console.log(winnings[4].replaceAll("\n","").replaceAll("\t","").replaceAll("+","").split("$"));
            // console.log(winnings[2]);
        }
        return(parsed);
    }catch(err){
        console.error(err);
    }
}

module.exports = ScrapeData;



