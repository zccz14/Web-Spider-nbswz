const co = require('co');
const MongoClient = require('mongodb').MongoClient;

function Export(req, res) {
    co(function* () {
        var db = yield MongoClient.connect('mongodb://localhost:27017/WebSpider');
        var MongoRes = yield db.collection('nbswz').find({}).toArray();
        var result = '';
        if (MongoRes.length > 0) {
            var keys = Object.keys(MongoRes[0]);
            keys = keys.filter(v => v !== '_id');
            result = keys.join(',') + '\n';
            MongoRes.forEach(record => {
                result += keys.map(key => record[key]).join(',') + '\n';
            });
        }
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-disposition', 'attachment; filename=export.csv')
        res.end(result);
    });
}

module.exports = Export;