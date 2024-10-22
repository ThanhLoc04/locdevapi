const fs = require('fs');
const path = require('path');
exports.name = '/caution';
exports.index = async(req, res, next) => {
    var text1 = req.query.text1;
    const path = require("path")
    const request = require('request');
    const axios = require("axios")
    const Canvas = require('canvas');
    const { loadImage, createCanvas } = require("canvas");
    if (!fs.existsSync(__dirname + `/cache/SVN-Arial Bold.ttf`)) {
        let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1kN9mwAYKK_lPTb6MAeU9LaZ4SRkzGY1r&export=download`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/cache/SVN-Arial Bold.ttf`, Buffer.from(getfont, "utf-8"));
    };
    let pathIMG = __dirname + `/cache/backg.png`;
    let background = (
        await axios.get(encodeURI(`https://i.imgur.com/KndXHeL.jpg`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathIMG, Buffer.from(background, "utf-8"));
    let baseImage = await loadImage(pathIMG);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let l = canvas.getContext("2d");
    l.drawImage(baseImage, 0, 0);
    var h = canvas.width / 2;
    var j = 360;
    Canvas.registerFont(__dirname + `/cache/SVN-Arial Bold.ttf`, {
        family: "SVN-Arial Bold"
    });
    l.font = "70px SVN-Arial Bold";
    l.fillStyle = "#000000";
    l.translate(150, 330);
    l.rotate(Math.PI / 180 * 0);
    l.fillText(text1.toUpperCase(), 0, 0);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathIMG, imageBuffer);
    res.sendFile(pathIMG);
}