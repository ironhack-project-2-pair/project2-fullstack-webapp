module.exports = (date, now) => {
    if (!date) {
      return '-';
    }
    const nowDay = now.getDate();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    if (now.getFullYear() - year > 1)
    {
      return `${padDigits(month)}/${padDigits(year)}`
    }
  
    return nowDay <= day && now.getMonth() === month
      ? `${padDigits(date.getHours())}:${padDigits(date.getMinutes())}`
      : `${padDigits(day)}/${padDigits(month + 1)}`;
  };
  
  const padDigits = (num, digits = 2) => {
    return Array(Math.max(digits - String(num).length + 1, 0)).join('0') + num;
  };