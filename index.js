const http = require("http");
const fs = require("fs");
const path = require("path");

const download = (url, dest) => {
  const file = fs.createWriteStream(path.join(process.cwd(), "assets"));
  const req = http.get(`http://at.alicdn.com/t/${url}.css`, function (res) {
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        console.log(rawData);
      } catch (e) {
        console.error(e.message);
      }
    });
    res.pipe(file);
  });
};

download("font_1463774_58ziz8lisc2");
