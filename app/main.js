'use strict';
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = require("./server.js");
const log = require("../utils/logger");
const checkAPI = require("../utils");
const config = require("../config.json");
const APIKEY = process.cwd() + "/utils/APIKEY.json"
const app = express();
const getIP = require('ipware')().get_ip;
const fs = require('fs');
const { resolve } = require("path");
const path = resolve(__dirname, 'data.json');
const { writeFileSync } = require('fs');

global.checkAPI = checkAPI.check_api_key
global.config = config;
global.APIKEY = APIKEY;
global._404 = process.cwd() + '/public/_404.html';

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    if(global.admin == true || global.admin == false) return next();
    global.admin
    var ipInfo = getIP(req);
    var block = require("../utils/block-ban/block.js")(ipInfo.clientIp)
    if (block == true) return
    var limit = require("../utils/block-ban/limit-request.js")(ipInfo.clientIp)
    var type = global.config.ADMIN.includes(ipInfo.clientIp) ? 'ADMIN' : 'IP'
    log(`${type}: ${ipInfo.clientIp} - Đã yêu cầu tới path: ${decodeURIComponent(req.url)}`, 'STATUS');
    next();
});

app.get('/total_request', function (request, response, next) {
  var admin = request.query.admin
  if(admin == "true") {
    global.admin = true
  }
  var data = require('./data.json')
  response.json(data)
  next()
})

app.use(function (req, res, next) {
    if(global.admin == true) {
      global.admin = false
      return next();
    }
    var data = require('./data.json');
    data.total = data.total + 1
    writeFileSync(path, JSON.stringify(data, null, 4));
    next();
});
app.use("/", server);
app.set("json spaces", 4);
app.use((error, req, res, next) => {
    res.status(error.status).json({
        message: error.message
    });
});

app.set('port', (process.env.PORT || 8888));
app.get('/', function (request, response) {
    response.send(`============= 𝐏𝐑𝐎𝐅𝐈𝐋𝐄 𝐃𝐔𝐍𝐆𝐊𝐎𝐍 =============<br><br>
•  𝐀𝐮𝐭𝐡𝐨𝐫: DũngKon<br>
•  𝐇𝐨̣ 𝐯𝐚̀ 𝐭𝐞̂𝐧: Nguyễn Đinh Tiến Dũng<br>
•  𝐍𝐠𝐚̀𝐲 𝐬𝐢𝐧𝐡: 01/04/2002<br>
•  𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊: https://www.facebook.com/nguyendinhtiendung.User/<br>
•  𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌: https://instagram.com/ban.follow.dao.2002<br>
•  𝐌𝐁𝐁𝐀𝐍𝐊: 1234567897749<br><br>
  ============= 𝐀𝐏𝐈 𝐋𝐈𝐒𝐓 𝐃𝐔𝐍𝐆𝐊𝐎𝐍 =============<br><br>
  + 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 <br><br>
  - 𝗶𝗻𝗳𝗼_𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸:/facebook/getinfo?uid= <br>
  - 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱_𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸:/facebook/video?url= <br>
  - 𝐍𝐠à𝐲 𝐓ạ𝐨 𝐓à𝐢 𝐊𝐡𝐨ả𝐧:/facebook/timejoine?uid= <br>
  - 𝐆𝐞𝐭 𝐓𝐨𝐤𝐞𝐧 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤:/facebook/token?username=< uid >&password=< pass >&twofactor=< 2fa >&_2fa=0 <br>
  + 𝐓𝐞𝐱𝐭<br>
  - 𝘁𝗵𝗶́𝗻𝗵":/text/thinh <br>
  - 𝗷𝗼𝗸𝗲𝗿:/text/joker <br>
  + 𝐓𝐫𝐨̀ 𝐜𝐡𝐨̛𝐢<br>
  - 𝗱𝗵𝗯𝗰:/game/dhbcv1 <br>
  - 𝗱𝗵𝗯𝗰𝘃𝟮:/game/dhbcv2 <br>
  - 𝘁𝗮𝗶𝘅𝗶𝘂:/game/taixiu <br>
  - 𝘁𝗮𝗶𝘅𝗶𝘂𝘃𝟮:/game/v2/taixiu <br>
  - 𝗻𝗼𝗶𝘁𝘂:/game/linkword?word= <br>
  - 𝗱𝗼𝘃𝘂𝗶:/game/dovui <br>
  - 𝘃𝘂𝗮𝘁𝗶𝗲𝗻𝗴𝘃𝗶𝗲𝘁:/game/vuatiengviet <br>
  + 𝐑𝐚𝐧𝐝𝐨𝐦 𝐈𝐦𝐚𝐠𝐞𝐬 & 𝐕𝐢𝐝𝐞𝐨 <br>
  - 𝘁𝗿𝗮𝗶:/images/trai <br>
  - 𝐚𝐧𝐢𝐦𝐞:/images/anime <br> 
  - 𝘃𝘂𝘁𝗼:/images/du <br> 
  - 𝗴𝗶𝗿𝗹:/images/girl <br>
  - 𝐥𝐨𝐧:/images/lon <br>
  - 𝐜𝐮:/images/cu <br>
  - 𝗻𝘂𝗱𝗲:/images/nude <br>
  + 𝐒𝐈𝐌𝐒𝐈𝐌𝐈 <br>
  - 𝗔𝗦𝗞:/sim?type=ask&ask= <br>
  - 𝗧𝗲𝗮𝗰𝗵:/sim?type=teach&ask=< ask >&ans=< ans > <br>
  + 𝐏𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭 <br>
  - 𝐏𝐢𝐧𝐭:/pinterest?search= <br>
  + 𝐓𝐈𝐊𝐓𝐎𝐊 <br>
  - 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱:/tiktok?video= <br>
  - 𝘀𝗲𝗮𝗿𝗰𝗵:/tiktok?search= <br>
  - 𝗶𝗻𝗳𝗼𝘂𝘀𝗲𝗿:/tiktok?info= <br>
  + 𝐇𝐄𝐍𝐓𝐀𝐈 <br>
  - 𝗶𝗻𝗳𝗼:/hentaiz/info?id= <br>
  - 𝐥𝐢𝐬𝐭:/hentaiz/list <br>
  - 𝗿𝗲𝗮𝗱:/hentaiz/read?id=< id >&chapter= < chapter > <br>
  + 𝐈𝐌𝐆𝐔𝐑 <br>
  - 𝘂𝗽𝗹𝗼𝗮𝗱_𝗶𝗺𝗴𝘂𝗿:/imgur?link= <br>
  + 𝐂𝐇𝐀𝐌𝐏𝐈𝐎𝐍 𝐋𝐎𝐋 <br>
  - 𝗰𝗵𝗮𝗺𝗽𝗶𝗼𝗻:/lol?champion= <br>
  - 𝗹𝗶𝘀𝘁_𝗰𝗵𝗮𝗺𝗽𝗶𝗼𝗻:/lol/list <br>
  + 𝐔𝐏𝐓𝐈𝐌𝐄𝐑𝐎𝐁𝐎𝐓 <br>
  - 𝐮𝐩𝐭𝐢𝐦𝐞𝐫𝐨𝐛𝐨𝐭:/uptimerobot/create?url= <br>
  + 𝐁𝐀𝐍𝐊 <br>
  - 𝗰𝗵𝗲𝗰𝗸:/bank/check <br>
  - 𝗳𝗶𝗻𝗱:/bank/find <br>
  - 𝗴𝗲𝘁:/bank/get <br>
  - 𝗽𝗮𝘀𝘀𝘄𝗼𝗿𝗱:/bank/password <br>
  - 𝗽𝗮𝘆:/bank/pay <br>
  - 𝗿𝗲𝗴𝗶𝘀𝘁𝗲𝗿:/bank/register <br>
  - 𝘀𝗲𝗻𝗱:/bank/send <br>
  - 𝘁𝗼𝗽:/bank/top <br>
============== 𝐃𝐎𝐍𝐀𝐓𝐄 ============== <br><br>
  - 𝐌𝐎𝐌𝐎: 0367281079 - 𝐂𝐓𝐊: NGUYEN DINH TIEN DUNG <br>
  - 𝐌𝐁𝐁𝐀𝐍𝐊: 1234567897749 - 𝐂𝐓𝐊: NGUYEN DINH TIEN DUNG <br>
  - 𝐕𝐈𝐄𝐓𝐂𝐎𝐌𝐁𝐀𝐍𝐊: 1016475889 - 𝐂𝐓𝐊: NGUYEN DINH TIEN DUNG <br>
  - 𝐁𝐈𝐃𝐕: 44010001084776 - 𝐂𝐓𝐊: NGUYEN DINH TIEN DUNG <br>
  `);
}).listen(app.get('port'));
const port = app.get('port');
log(`API SUMIPROJECT`, 'HOST UPTIME');
app.post('/upcode', function (req, res) {
    var code = req.body.code;
    var id = ((Math.random() + 1).toString(36).substring(2)).toUpperCase()
    fs.writeFile(
        `${__dirname}/public/codeStorage/database/_${id}.js`,
        code,
        "utf-8",
        function (err) {
            if (err) return res.json({
                status: false,
                url: 'Không thể up code của bạn lên!'
            })
            return res.json({
                status: true,
                url: 'https://subnhanh.vn/upcode/raw/?id=' + id
            })
        }
    );
});