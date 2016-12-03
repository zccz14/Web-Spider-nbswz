# 又一个 Web 爬虫

目标：宁波水文站

页面目标：`http://www3.nbswz.com.cn:8080/swz/shared/tide_info.html`

经分析后发现其数据目标：`http://www3.nbswz.com.cn:8080/swz/Shared?&/getTideWater`

## 安装

NPM:

```bash
$ npm install
```

Ensure MongoDB URI `mongodb://localhost:27017/WebSpider` avaliable.

## 命令

```bash
$ npm start # 启动爬虫 ; Fetch 间隔 1 分钟
```