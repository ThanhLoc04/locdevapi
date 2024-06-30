const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/password';
exports.index = async(req, res, next) => {
	var { writeFileSync} = require('fs-extra');

	var type = req.query.bka
	var senderID = req.query.dka
	var newPassword = req.query.fka

	if(!type || !senderID) return res.json({ status: false, message: 'Thiếu dữ liệu!'})
	var findTk = dataBank.find(i => i.senderID == senderID)
	if(!findTk) {
		return res.json({
			status: false,
			message: 'Không tìm thấy tài khoản của bạn!'
		})
	}
	switch(type) {
		case 'get': {
			return res.json({
				status: true,
				message: {
					noti: 'Mật khẩu của bạn!',
					name: findTk.name,
					STK: findTk.data.STK,
					password: findTk.data.password
				}
			})
		}
		case 'recovery': {
			if(!newPassword) return res.json({ status: false, message: 'Vui lòng nhập mật khẩu mới!'})
			findTk.data.password = newPassword
			writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
			return res.json({
				status: true,
				message: {
					noti: 'Thay đổi mật khẩu thành công!',
					name: findTk.name,
					STK: findTk.data.STK,
					password: findTk.data.password
				}
			})
		}
		default: {
			return res.json({ status: false, message: 'không có phương thức bạn đã chọn' });
		}
	}
}