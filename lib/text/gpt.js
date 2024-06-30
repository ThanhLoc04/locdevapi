const axios = require('axios');
exports.name = 'chat/gpt';

exports.index = async (req, res, next) => {
  try {
    // Xác thực API Key
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: 'Thiếu câu hỏi' });

    const response = await axios.get(`https://ai.bangcoi.repl.co/gpt?q=${q}`);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.' });
  }
};