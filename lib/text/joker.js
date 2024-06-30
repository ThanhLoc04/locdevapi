exports.name = '/text/joker';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/json/joker.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            data: image,
            count: girl.length
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}