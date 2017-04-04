const co = require('co');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config.json');

//noinspection JSUnusedLocalSymbols
function Export(req, res) {
  co(function*() {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-disposition', 'attachment; filename=export.csv');
    const db = yield MongoClient.connect(config.mongodb);
    const sites = yield db.collection('nbswz').distinct("站名");
    const times = yield db.collection('nbswz').distinct("时间");
    let title = ["站名", ...times].join(',') + '\n';
    res.write(title);
    for (let site of sites) {
      console.log(site);
      let line = yield db.collection('nbswz').find({"站名": site}, {"潮位": 1}).toArray();
      let lineres = [site, ...line.map(v => v["潮位"])].join(',') + '\n';
      res.write(lineres);
    }
    res.end();
  });
}

module.exports = Export;