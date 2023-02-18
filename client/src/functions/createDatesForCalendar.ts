export const datesForCalendar = (currentDate: Date) => {
  const datesArray: Date[][] = [
    [
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
    ],
    [
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
    ],
    [
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
    ],
    [
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
      currentDate,
    ],
  ];
  const msInDay = 86307444;
  // const currentYear = currentDate.getFullYear();
  // const currentMonth = currentDate.getMonth();
  const firstDayInMonth = new Date(currentDate.setDate(1)).getDay();
  const firstDateInCalendar = new Date(
    currentDate.setDate(1) - msInDay * firstDayInMonth
  );
  let currentDayInCalendar = firstDateInCalendar;

  for (let i = 0; i < datesArray.length; i++) {
    for (let j = 0; j < datesArray[0].length; j++) {
      datesArray[i][j] = new Date(currentDayInCalendar);
      currentDayInCalendar = new Date(+currentDayInCalendar + msInDay);
    }
  }
  return datesArray;
};
