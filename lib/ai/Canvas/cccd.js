//const { error } = require("../logger.js");
//const router = require("express").Router();
exports.name = '/cccd';
const axios = require("axios")
const fs = require("fs-extra")

exports.index = async  (req, res, next) => {
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
 var text1       = req.query.text1,
  text2       = req.query.text2,
  text3       = req.query.text3,
  text4       = req.query.text4,
  urlimg      = req.query.urlimg;
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
	let pathImg = __dirname + '/cache/bgrcccd.png'; // Lấy background
  let pathAva = __dirname + "/cache/fakecccd.png"; // Lấy AVT
	var baseImage = await loadImage(pathImg);
  let inimage = ( await axios.get(`${urlimg}`,{ responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathAva, Buffer.from(inimage, "utf-8"));
  let image = await loadImage(pathAva);

  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/UTMAvoBold.ttf", {family: "UTMAvoBold1"}); // Lấy font
  registerFont(__dirname+"/UTMAvoBold.ttf.ttf", {family: "BalooRegular2"}); //Lấy font

	var canvas = createCanvas(baseImage.width, baseImage.height);
	var ctx = canvas.getContext("2d");

  ctx.drawImage(image, 110, 281, 250, 310); // Avt
	ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height); // Background

  ctx.shadowBlur = 2 ;     // Đổ Bóng
  ctx.shadowColor = "#463c39";

  ctx.rotate(-1.60 * Math.PI / 180);
	ctx.font = "30px arial";
	ctx.fillStyle = "#161206";
  ctx.textAlign = "start";
	const lines = (ctx, text1);
	ctx.fillText(lines, 470, 336);

const lines2 = (ctx, text2); // Tên
	ctx.font = "30px arial1";
	ctx.fillStyle = "#161206";
  ctx.textAlign = "start";
  ctx.fillText(lines2, 590, 408);

const lines3 = (ctx, text3); // Ngày sinh
  ctx.font = "25px arial";
	ctx.fillStyle = "#161206";
  ctx.textAlign = "start";
  ctx.fillText(lines3, 460, 452);

const lines4 = (ctx, text4); // Quê quán
  ctx.font = "30px arial";
	ctx.fillStyle = "#161206";
  ctx.textAlign = "start";
	ctx.fillText(lines4, 475, 496);

  ctx.font = "30px arial";
	ctx.fillStyle = "#161206";
  ctx.textAlign = "start";
	ctx.fillText(lines4, 525, 562);

	ctx.beginPath();            // Xuất file
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(__dirname + "/cache/cccd.png", imageBuffer);
	return res.sendFile(__dirname + "/cache/cccd.png");
}