const co = require('co');
const fs = require('fs');
const request = require('superagent');
const MongoClient = require('mongodb').MongoClient;

function Fetch() {
    co(function* () {
        var timestamp = new Date().toLocaleString();
        console.log('[event] fetch at', timestamp);
        var db = yield MongoClient.connect('mongodb://localhost:27017/WebSpider');
        console.log('[event] database connection established');
        var res = yield request('http://www3.nbswz.com.cn:8080/swz/Shared?&/getTideWater')
            .set('Accept', 'application/json')
            .then(res => res.text)
            .then(res => JSON.parse(res))
            .then(res => res.aaData)
            .then(res => res.map(v => {
                v.stnm = v.stnm.match(/>(.*)</) || '';
                if (v.stnm) {
                    v.stnm = v.stnm[1];
                }
                v.trend = v.trend.match(/>(.*)</) || '';
                if (v.trend) {
                    v.trend = v.trend[1];
                }
                return {
                    '时间': timestamp,
                    '站名': v.stnm,
                    '潮位': v.sw85,
                    '警戒': v.guard,
                    '保证': v.ensure,
                    '塘顶高': v.polTop,
                    '海塘名': v.polName,
                    '涨落': v.trend
                };
            }))
            .then(res => res.map(v => {
                Object.keys(v).forEach((key) => v[key] = v[key].trim())
                return v;
            }));
        console.log('[event] data parsed');
        var WrittenResult = yield db.collection('nbswz').insertMany(res);
        console.log('[event] database writen');
        db.close();
        console.log('[event] database connection closed');
    }).catch(err => {
        console.log('[event][error] read "error.log" for details');
        fs.appendFileSync('error.log', { datetime: new Date(), err });
    });
}

module.exports = Fetch;