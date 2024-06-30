function key_huydev(req, res, next) {
  const fs = require('fs-extra');
  try {
    const data_apikey = require('./key.json');
    const apikey = req.query.apikey;
    
    const huykaiserdev = data_apikey.find(i => i.apikey === apikey);

    if (!huykaiserdev) {
      return res.json({
        error: 'APIKEY không chính xác'
      });
    } else {
      if (huykaiserdev.request === 0) {
        return res.json({
          error: 201,
          message: 'APIKEY của bạn đã hết lượt request'
        });
      } else {
        // Trừ đi 1 lượt request và ghi vào file
        if (huykaiserdev.keytype == 'Free') {
        huykaiserdev.request = huykaiserdev.request - 1;
        fs.writeFileSync(__dirname + '/key.json', JSON.stringify(data_apikey, null, 2), 'utf-8');

      }
    }
                                         }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  key_huydev
};