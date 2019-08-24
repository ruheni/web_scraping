const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

const url = "https://www.investing.com/equities/centum-invest-historical-data";

axios
  .get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    const tableData = $("#curr_table tbody tr");

    let data = [];
    let date, price, open, high, low;
    let json = { date, price, open, high, low };

    for (let i = 0; i < tableData.length; i++) {
      date = $(tableData[i]).find("td")[0];
      price = $(tableData[i]).find("td")[1];
      open = $(tableData[i]).find("td")[2];
      high = $(tableData[i]).find("td")[3];
      low = $(tableData[i]).find("td")[4];

      let json = { date, price, open, high, low };
      data.push(json);
      if (json) {
        json.date = $(date).text();
        json.price = $(price).text();
        json.open = $(open).text();
        json.high = $(high).text();
        json.low = $(low).text();
        // console.log(json);
        console.log(data.length);
      }
    }
  })
  .catch(err => console.error("An error occured...", err));
