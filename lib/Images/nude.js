exports.name = '/images/nude';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/json/nude.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            url: image,
            count: girl.length
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}