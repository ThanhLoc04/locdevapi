const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/send';
exports.index = async(req, res, next) => {
	var { writeFileSync} = require('fs-extra');

	var senderID = req.query.senderID
	var money = req.query.money

	if(!senderID || !money) return res.json({ status: false, message: 'Thiếu dữ liệu!'})
	var findTk = dataBank.find(i => i.senderID == senderID)
	if(!findTk) {
		return res.json({
			status: false,
			message: 'Không tìm thấy tài khoản của bạn!'
		})
	}
	else {
		var moneyS = findTk.data.money
		findTk.data.money = findTk.data.money + parseInt(money)
		writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
		return res.json({
			status: true,
			message: {
				noti: 'Nạp tiền thành công!',
				name: findTk.name,
				money: `${moneyS} + ${money} = ${moneyS + parseInt(money)}`
			}
		})
	}
}