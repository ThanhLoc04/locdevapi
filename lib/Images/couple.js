exports.name = '/images/couple';
exports.index = async(req, res, next) => {
    const ress = require("'./data/json/couple.json'");
    const length1 = ress.couple.length
    const dataGame = ress.couple[Math.floor(Math.random() * length1)]
    res.json({ dataGame })
}