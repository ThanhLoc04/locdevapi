exports.name = '/tiktok';
const { post } = require('axios');
const tikwm = `https://www.tikwm.com`;

exports.index = async function (req, res, next) {
  try {
    const { user, video, music, trending, search, info } = req.query;
    let data;

    if (user) {
      data = (await post(`${tikwm}/api/user/posts`, { unique_id: user })).data;
    } else if (video) {
      data = (await post(`${tikwm}/api/`, { url: video })).data;
    } else if (music) {
      data = (await post(`${tikwm}/api/music/posts`, { music_id: music })).data;
    } else if (trending) {
      data = (await post(`${tikwm}/api/feed/list`, { region: trending })).data;
    } else if (search) {
      data = (await post(`https://tikwm.com/api/feed/search?keywords=${search}`)).data;
    } else if (info) {
      data = (await post(`https://www.tikwm.com/api/user/info?unique_id=${info}`)).data;
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
