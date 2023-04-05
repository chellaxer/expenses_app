export function dateStringToObject(date) {
  // console.log(`[dateStringToObject] typeof date: ${typeof date}`);
  if (typeof date === 'string') {
    return new Date(date);
    // return Date.parse(date);
    // return newDate.toISOString().slice(0, 10);
    // return date.toISOString().slice(0, 10);
  }
  return date;
}
export function getFormattedDate(date) {
  // return date;
  // console.log(`[getFormattedDate] typeof date: ${typeof date}`);
  const dateObj = dateStringToObject(date);
  return dateObj.toISOString().slice(0, 10);
  // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateMinusDays(date, days) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    (date.getDate() - days),
  );
}

export function getDateToday() {
  // return new Date().toISOString().slice(0, 10);
  return new Date();
}
