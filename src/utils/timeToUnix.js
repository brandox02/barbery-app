export const timeToUnix = (time) => {
  const hours = parseInt(time.substring(0, 3));
  const minutes = parseInt(time.substring(3, 6));
  const seconds = parseInt(time.substring(6, 8));

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(0);

  const unixTime = date.getTime();

  return unixTime;
};
