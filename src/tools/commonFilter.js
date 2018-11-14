const commonFilter = {
  toThousands: function (num, idx = 2, addFlg = false) {
    if (num || num === 0.0) {
      num = parseFloat(num || 0).toFixed(idx);
      if (/^-?\d+\.?\d*$/.test(num)) {
        if (/^-?\d{1,}$/.test(num)) {
          num = num + ',00';
        } else {
          num = num.replace(/\./, ',');
        }
        while (/\d{4}/.test(num)) {
          num = num.replace(/(\d+)(\d{3}\,)/, '$1,$2');
        }
        num = num.replace(/\,(\d*)$/, '.$1');
      }
      if (num >= 0 && addFlg === true) {
        num = '+' + num;
      }
      return num;
    } else {
      num = '';
      return num;
    }
  },
  formatRate: function (val) {
    if (val) {
      if (val >= 0) {
        val = '+' + val;
      } else {
        val = '-' + val;
      }
    } else {
      val = '';
    }
    return val;
  },
  deleteOF: function (val) {
    if (val.slice(-3) === '.OF') {
      val = val.slice(0, -3);
    }
    return val;
  }
}
module.exports = commonFilter;
