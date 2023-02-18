export const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

interface IdatesArrayProps {
  datesArray: Date[][];
  activeDays?: string[];
}

export const UserCalendar = ({ datesArray, activeDays }: IdatesArrayProps) => {
  const today = new Date();
  const yearToday = today.getFullYear();
  const monthToday = today.getMonth();
  // const dayToday = today.getDate;

  return (
    <>
      <div className="calendar-wrap flex flex-col">
        <div className="month-year flex flex-col">
          <p className="year">{yearToday.toString()}</p>
          {/* <p className="month"></p> */}
        </div>
        <div className="table-month">
          <table>
            <thead>
              <tr>
                <th colSpan={7}>{months[monthToday]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {daysOfWeek.map((day) => (
                  <td>{day}</td>
                ))}
              </tr>
              {datesArray.map((line) => (
                <tr>
                  {line.map((thisDate) => (
                    <td
                      className={
                        activeDays?.includes(thisDate.toString())
                          ? 'active-date'
                          : ''
                      }
                    >
                      {thisDate.getDate()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
