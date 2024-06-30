const moment = require('moment-timezone');

exports.name = '/date';
exports.index = async (req, res, next) => {
  try {
    const birthDateString = moment(req.query.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const birthDate = moment.tz(birthDateString, 'Asia/Ho_Chi_Minh');
    const currentDate = moment.tz("Asia/Ho_Chi_Minh");

    // Calculate elapsed time since birth date
    const years = currentDate.diff(birthDate, 'years');
    const months = currentDate.diff(birthDate, 'months');
    const weeks = currentDate.diff(birthDate, 'weeks');
    const days = currentDate.diff(birthDate, 'days');
    const hours = currentDate.diff(birthDate, 'hours');
    const minutes = currentDate.diff(birthDate, 'minutes');
    const seconds = currentDate.diff(birthDate, 'seconds')

    // Calculate remaining time to next birthday
    let dem;
    if (currentDate.isAfter(birthDate)) {
      const nextBirthDate = birthDate.clone().add(1, 'years');
      dem = nextBirthDate.diff(currentDate);
    } else {
      dem = birthDate.diff(currentDate);
    }

    // Calculate remaining years, months, weeks, days, hours, minutes, and seconds
    const years1 = Math.floor(dem / 31536000000);
    dem -= years1 * 31536000000;
    const months1 = Math.floor(dem / 2592000000);
    dem -= months1 * 2592000000;
    const weeks1 = Math.floor(dem / 604800000);
    dem -= weeks1 * 604800000;
    const days1 = Math.floor(dem / 86400000);
    dem -= days1 * 86400000;
    const hours1 = Math.floor(dem / 3600000);
    dem -= hours1 * 3600000;
    const minutes1 = Math.floor(dem / 60000);
    dem -= minutes1 * 60000;
    const seconds1 = Math.floor(dem / 1000);

    res.json({
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      //years1,
      months1,
      weeks1,
      days1,
      hours1,
      minutes1,
      seconds1
    });
  } catch (error) {
    console.log(error);
  }
};
