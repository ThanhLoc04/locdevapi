exports.name = '/images/bopmong';
exports.index = async(req, res, next) => {
    const fs = require('fs-extra');
    try {
        const bopmong = require('./data/json/bopmong.json');
        var image = bopmong[Math.floor(Math.random() * bopmong.length)].trim();
        res.jsonp({
            url: image,
            count: bopmong.length
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}