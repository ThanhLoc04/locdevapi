exports.name = '/images/trai';
exports.index = async(req, res, next) => {
    const fs = require('fs-extra');
    try {
        const girl = require('./data/json/trai.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            url: image,
            count: girl.length
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}