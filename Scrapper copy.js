import fetch from 'node-fetch';
import { load } from 'cheerio';

var Scrapper = async function(){
    const url = 'https://www.wclc.com/winning-numbers/lotto-max-extra.htm';

    const response = await fetch(url);
    const body = await response.text();

    let $ = load(body);
    let parsed = [];
    $(".pastWinNumGroup").each((_, e) => {
        let temp = [];
        $(e).children(".pastWinNumbers").children("li").each((_,el)=>{
            temp.push($(el).text().replace("Bonus",""));
        });
        let date = $(e).children(".pastWinNumDate").children("h4").text().replaceAll("\n", "").replaceAll("\t","");
        parsed.push({date, numbers: temp});
    })
    return parsed;
};

module.exports = Scrapper;

