async function downloadVideoV2(link) {
    var resolveFunc = function () {};
    var rejectFunc = function () {};
    var returnPromise = new Promise(function (resolve, reject) {
        resolveFunc = resolve;
        rejectFunc = reject;
    });
    const axios = require('axios')
    const i = (await axios.get(link, {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            "upgrade-insecure-requests": "1",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
        }
    })).data
    try {
        const link = i.match(/"permalink_url":"(.*?)"/);
        const dur = i.match(/"playable_duration_in_ms":(.*?),/);
        const articleBody = i.match(/"articleBody":"(.*?)"/);
        const sd = i.match(/"playable_url":"(.*?)"/);
        const hd = i.match(/"playable_url_quality_hd":"(.*?)"/);
        const author = i.match(/"owner_as_page":{(.*?)}/) || i.match(/"owning_profile":{(.*?)}/);
        console.log({
            title: articleBody[1],
            duration: dur[1],
            link: link[1].replace(/\\/g, ''),
            downloadVideo: {
                SD: (sd != null) ? sd[1].replace(/\\u00253D/g, '%3D').replace(/\\/g, '') : null,
                HD: (hd != null) ? hd[1].replace(/\\u00253D/g, '%3D').replace(/\\/g, '') : null
            },
            author: JSON.parse(`{${author[1]}}`)
        })
        if (articleBody[1] == null) return resolveFunc(false)
    } catch (e) {
        console.log(e)
        return resolveFunc(false)
    }
    return returnPromise
}
module.exports = {
    downloadVideo: downloadVideoV2
}