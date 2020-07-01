const http = require("http");
const fs = require("fs");
const path = require("path");

// 将字体文件过滤出来
const filterUrl = (str) =>
  str
    .match(/url\('\/\/at\.alicdn\.com[\/a-z_\d=?.#]+'\)/g)
    .filter((x) => /^((?!iefix).)*$/.test(x));

const download = (url, dest) => {
  const file = fs.createWriteStream(path.join(process.cwd(), dest));
  const req = http.get(url, function (res) {
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        if (dest.endsWith("iconfont.css")) {
          const fontUrls = filterUrl(rawData);
          console.log(fontUrls);
          const nextUrls = fontUrls.map((x) => ({
            url: `http:${x.slice(5, -2)}`,
            ext: x.match(/\.([eotwfsvg]{3,4})(?=\?)/g)[0], //扩展名
          }));
          nextUrls.forEach((x) => {
            download(x.url, `iconfont${x.ext}`);
          });
        }
      } catch (e) {
        console.error(e.message);
      }
    });
    res.pipe(file);
  });
};

const cssKey = "font_1463774_58ziz8lisc2";

download(`http://at.alicdn.com/t/${cssKey}.css`, "iconfont.css");
