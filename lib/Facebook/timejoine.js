exports.name = '/facebook/timejoine';
const axios = require('axios');

exports.index = async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://graph.facebook.com/v15.0/${req.query.uid}?fields=id,name,created_time&access_token=EAAD6V7os0gcBAMFxlMeher3vP63WJBwlPZBvkR8555W1lZAoZCaifSUjLprOrXocnZB7DTRkY2OliG9BzDhaXNko4yCSBrDKP2fFOZB2Dsb01ixmNq1ezqgvZArNGEUjcLHCjIvOEqaCQs98q0HZANzZAzjU01gj8clWGZAAk1P36opVsHmIrmNZCU`);
    const createdTime = data.created_time;
    const day = createdTime.split("-")[2].split("T")[0];
    const month = createdTime.split("-")[1].split("T")[0];
    const year = createdTime.split("-")[0];
    const hour = createdTime.split("T")[1].split(":")[0];
    const min = createdTime.split(":")[1].split("+")[0];
    const ss = createdTime.split(":")[2].split("+")[0];
    const date = `${day}/${month}/${year}`;
    const time = `${hour}:${min}:${ss}`;
    res.json({
      uid: data.id,
      name: data.name,
      day: `${date}`,
      time: `${time}`,
      author: 'Dũngkon SUMIPROJECT'
    });
  } catch (e) {
    console.log(e);
  }
};
