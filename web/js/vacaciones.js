var currentDate = new Date();
var currentDayOfWeek = currentDate.getDay();
var startDayOfWeek = new Date(currentDate.getTime() - (currentDayOfWeek * 24 * 60 * 60 * 1000));

var currentDate = new Date();
var currentDayOfWeek = currentDate.getDay();
var endDayOfWeek = new Date(currentDate.getTime() + ((6 - currentDayOfWeek) * 24 * 60 * 60 * 1000));

console.log(`${startDayOfWeek}-${endDayOfWeek}`)









