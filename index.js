const http = require("http");
const fs = require("fs");
const path = require("path");

// 将字体文件过滤出来
const filterUrl = (str) =>
  str.match(/url\('\/\/at\.alicdn\.com[\/a-z_\d=?.#]+'\)/g);
const download = (url, dirname, filename) => {
  const dest = path.join(process.cwd(), dirname, filename);
  const file = fs.createWriteStream(dest);
  const req = http.get(url, function (res) {
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        // console.info("uuu:", rawData);
        // if (!rawData.includes("@font-face")) {
        //   console.warn("请输入正确的 css key");
        //   return;
        // }
        if (filename === "iconfont.css") {
          const fontUrls = filterUrl(rawData);
          // console.log(fontUrls);
          const nextUrls = fontUrls
            .filter((x) => /^((?!iefix).)*$/.test(x))
            .map((x) => ({
              url: `http:${x.slice(5, -2)}`,
              ext: x.match(/\.([eotwfsvg]{3,4})(?=\?)/g)[0], //扩展名
            }));

          nextUrls.forEach((x) => {
            download(x.url, dirname, `iconfont${x.ext}`);
          });

          // 替换字体路径为本地
          const nextData = rawData.replace(
            /(\/\/at\.alicdn\.com)([\S]+)(?=\.)/g,
            "iconfont"
          );
          // console.info("kkk");
          fs.writeFileSync(dest, nextData);
          console.info("字体更新完成");
        }
      } catch (e) {
        console.error(e.message);
      }
    });
    if (filename !== "iconfont.css") {
      // console.info("pppp");
      res.pipe(file);
    }
  });
};

const main = (cssKey, dirname) => {
  // const cssKey = "font_1463774_58ziz8lisc2";
  try {
    download(`http://at.alicdn.com/t/${cssKey}.css`, dirname, "iconfont.css");
  } catch (error) {
    console.error(error);
  }
};

module.exports = main;
