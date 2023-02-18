export const findStreaks = (daysArray: string[]) => {
  let streak = 0;
  let bestStreak = 0;
  if (daysArray.length) {
    bestStreak = 1;
    streak = 1;
    let prevDay = new Date(daysArray[0]);
    if (daysArray.length > 1) {
      for (let i = 1; i < daysArray.length; i++) {
        let currentDay = new Date(daysArray[i]);
        let dif = +currentDay - +prevDay;
        if (dif <= 86400000) {
          streak += 1;
          bestStreak = streak > bestStreak ? streak : bestStreak;
        } else {
          streak = 1;
        }
        prevDay = new Date(daysArray[i]);
      }
    }
  }
  return [streak, bestStreak];
};
