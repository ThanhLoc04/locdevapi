const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/get';
exports.index = async(req, res, next) => {
	var { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');

	var senderID = req.query.ID
	var money = req.query.money
	var password = req.query.password

	if(!senderID || !money || !password) return res.json({ status: false, message: 'Thiếu dữ liệu!'})
	var findTk = dataBank.find(i => i.senderID == senderID)
	if(!findTk) {
		return res.json({
			status: false,
			message: 'Không tìm thấy tài khoản của bạn!'
		})
	}
	if(password !== findTk.data.password) {
		return res.json({
			status: false,
			message: 'Sai mật khẩu'
		})
	}
	else {
		var moneyG = findTk.data.money
		if(moneyG < money) {
			return res.json({
				status: false,
				message: 'Số dư không đủ để thực hiện giao dịch'
			})
		}
		findTk.data.money = findTk.data.money - parseInt(money)
		writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
		return res.json({
			status: true,
			message: {
				noti: 'Rút tiền thành công!',
				name: findTk.name,
				money: `${moneyG} - ${money} = ${moneyG - parseInt(money)}`
			}
		})
	}
}