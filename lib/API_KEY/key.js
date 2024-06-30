const fs = require('fs');
const path = require('path');
exports.name = '/apikey';
exports.index = async(req, res, next) => {
    const path_D = path.join(__dirname, 'data', 'key.json');
    if (!fs.existsSync(path_D)) {
        fs.writeFileSync(path_D, '[]', 'utf-8');
    }
    const data_apikey = require('./data/key.json');
    if (data_apikey.find(i => i.name == req.query.name)) {
        return res.json({
            error: 'Bạn đã có key trên hệ thống'
        });
    }
    if (req.query.keytype == 'dangky') {
        let name = req.query.name;
        if (!name) return res.json({
            error: 'Thiếu dữ liệu để thực hiện yêu cầu cho bạn.'
        });
        else {
            if (req.query.apikey == 'DungKon2000') {
                var keytype = 'Premium';
                var apikey = 'DUNGKON_';
                var request = 'infinite';
            } else {
                var keytype = 'Free';
                var request = 50;
                var apikey = 'DUNGKONFREE_';
            }
            const data = require(global.APIKEY)
            var random = '1234567890';
            var number = 10;
            for (var i = 0; i < number; i++) {
                apikey += random.charAt(Math.floor(Math.random() * random.length));
            }
            data.push({ apikey, name, request, keytype });
            fs.writeFileSync(path_D, JSON.stringify(data, null, 2), 'utf-8');
            res.json({
                success: 200,
                apikey,
                keytype,
                message: 'Tạo apikey thành công!'
            })
        }
    } else if (req.query.keytype == 'checker') {
        var apikey = req.query.apikey;
        const data = require('./data/key.json');
        if (!data.find(i => i.apikey == apikey)) {
            return res.json({
                error: 'APIKEY không tồn tại!'
            })
        } else {
            var APIKEY = data.find(i => i.apikey == apikey);
            return res.json(APIKEY)
        }
    } else {
        return res.json({
            error: 'Không tìm thấy lệnh mà bạn yêu cầu'
        })
    }
}



