[996.icu]: https://img.shields.io/badge/link-996.icu-%23FF4D5B.svg?style=flat-square
[996.icu-url]: https://996.icu/#/en_US

<div align="center">
  <h1>Update Or Download Iconfont</h1>
  <p>update or download iconfont</p>
</div>

<h2 align="center">Install</h2>

```bash
npm i update-iconfont -D
```

<h2 align="center">Usage</h2>

用于下载或更新 iconfont

- 通过 npx 使用

```
npx update-iconfont --dirname static --key font_270600_38sj3692lvt
```

- 全局安装

1. `npm install update-iconfont -g`
2. `udiconfont --dirname static --key font_270600_38sj3692lvt`

--dirname 目录名

--key iconfont 中 css 的 key,比如 font class 的链接为//at.alicdn.com/t/font_270600_38sj3692lvt.css，那么 key 就是 font_270600_38sj3692lvt
