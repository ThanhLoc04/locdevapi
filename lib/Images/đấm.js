exports.name = '/images/dam';
exports.index = async(req, res, next) => {
    const fs = require('fs-extra');
    try {
        const dam = require('./data/json/dam.json');
        var image = dam[Math.floor(Math.random() * dam.length)].trim();
        res.jsonp({
            url: image,
            count: dam.length
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}