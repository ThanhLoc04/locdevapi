exports.name = '/facebook/video';
'use strict';
const axios = require('axios')
exports.index = async (req, res, next) => {
  var url = req.query.url
  var axios = require("axios");
  var data = {
    "sec-fetch-user": "?1",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-site": "none",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "cache-control": "max-age=0",
    authority: "www.facebook.com",
    "upgrade-insecure-requests": "1",
    "accept-language": "en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6",
    "sec-ch-ua": '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    cookie: "c_user=100024871212620; xs=16:AKE7n1DTbubG6w:2:1685584388:-1:6182; fr=0zKbnkCC3h09ES5cn.AWXtwQnP2lqzHkYp6HmvFgpJqIU.Bkd_oE..AAA.0.0.Bkd_oE.AWV00hMSA9w; datr=BPp3ZL4tONTlDGBe8lpCeSJR;"
  };
  /**
   * @param {string} callbackId
   * @return {?}
   */
  var wrap = function getValue(callbackId) {
    return JSON.parse('{"text": "' + callbackId + '"}').text;
  };
  return new Promise(function(resolve) {
    if (!url || !url.trim()) {
      return res.jsonp("Thiếu url facebook");
    }
    if (!url.includes("facebook.com")) {
      return res.jsonp("Vui lòng nhập video facebook hợp lệ!");
    }
    axios.get(url, {
      headers: data
    }).then(function(rawResponse) {
      var data = rawResponse.data;
      var nodes = data.match(/"playable_url":"(.*?)"/);
      var match = data.match(/"playable_url_quality_hd":"(.*?)"/);
      var object = data.match(/"preferred_thumbnail":{"image":{"uri":"(.*?)"/);
      if (nodes && nodes[1]) {
        var result = {
          url: url,
          sd: wrap(nodes[1]),
          hd: match && match[1] ? wrap(match[1]) : "",
          thumbnail: object && object[1] ? wrap(object[1]) : ""
        };
        res.jsonp(result);
      } else {
        res.jsonp("Cookie die nên không thể tải video trong group!");
      }
    });
  });
}