function check_api_key(apikey) {
    const fs = require('fs');
    try {
        if(!apikey) return {
            error: 1,
            msg: 'thiếu api key'
        }
        const data_apikey = require(global.APIKEY);
        if (!data_apikey.find(i => i.apikey == apikey)) {
            return {
                error: 1,
                msg: 'APIKEY KHÔNG CHÍNH XÁC!'
            }
        } else {
            let APIKEY = data_apikey.find(i => i.apikey == apikey);
            if (APIKEY.request == 0) {
                return {
                    error: 1,
                    msg: 'APIKEY của bạn đã hết lượt request'
                }
            } 
            else {
                if (APIKEY.type == 'free') {
                    APIKEY.request = APIKEY.request - 1;
                    fs.writeFileSync(global.APIKEY, JSON.stringify(data_apikey, null, 2), 'utf-8');
                    return {
                        error: 0
                    }
                }
                if (APIKEY.type == 'premium') {
                    return {
                        error: 0
                    }
                }
            }
        }
    } catch (e) {
        return {
            error: 1,
            msg: 'Đã xảy ra lỗi với API KEY của bạn!'
        }
    }
}

module.exports = {
    check_api_key
};

