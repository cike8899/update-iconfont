#!/usr/bin/env node
const main = require("../index");

console.info("hello xx");
console.info(process.argv);

// const [, , arg, val, nextArg, nextVal] = process.argv;

// console.info(arg, val, nextArg, nextVal);

const cssKeyIdx = process.argv.indexOf("--key");
const dirNameIdx = process.argv.indexOf("--dirname");

console.info(cssKeyIdx, dirNameIdx);

if (cssKeyIdx !== -1) {
  const cssKeyValIdx = cssKeyIdx + 1;
  const cssKeyVal = process.argv[cssKeyValIdx];

  if (cssKeyVal) {
    if (dirNameIdx !== -1) {
      const dirNameValIdx = dirNameIdx + 1;
      const dirNameVal = process.argv[dirNameValIdx];
      if (dirNameVal) {
        main(cssKeyVal, dirNameVal);
      } else {
        console.warn("请输入存放字体的目录的值");
      }
    } else {
      console.warn("请输入存放字体的目录");
    }
  } else {
    console.warn("请输入 css key 的值");
  }
} else {
  console.warn("请输入 css key");
}
