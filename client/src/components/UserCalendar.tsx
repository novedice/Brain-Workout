import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { datesForCalendar } from '../functions/createDatesForCalendar';
import './UserCalendar.css';

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
  activeDays?: string[];
}

export const UserCalendar = ({ activeDays }: IdatesArrayProps) => {
  const [datesArray, setDatesArray] = useState<Date[][]>(
    datesForCalendar(new Date())
  );
  const [today, setToday] = useState(new Date());
  const [yearToday, setYearToday] = useState(today.getFullYear());
  const [monthToday, setMonthToday] = useState(today.getMonth());

  const handlePeriod = (
    direction: 'prev' | 'next',
    period: 'month' | 'year'
  ) => {
    if (direction === 'prev') {
      setToday(
        new Date(
          period === 'year'
            ? today.setFullYear(yearToday - 1)
            : today.setMonth(monthToday - 1)
        )
      );
    } else {
      setToday(
        new Date(
          period === 'year'
            ? today.setFullYear(today.getFullYear() + 1)
            : today.setMonth(today.getMonth() + 1)
        )
      );
    }
    setMonthToday(today.getMonth());
    setYearToday(today.getFullYear());
    setDatesArray(datesForCalendar(today));
  };

  return (
    <>
      <div className="calendar">
        <div className="table-calendar">
          <table className="table">
            <thead className="month">
              <tr>
                <th
                  className="change-period"
                  onClick={() => handlePeriod('prev', 'year')}
                >
                  {`<<`}
                </th>
                <th className="upper-first" colSpan={5}>
                  {yearToday}
                  {/* <FormattedMessage id={months[monthToday]} /> */}
                </th>
                <th
                  className="change-period"
                  onClick={() => handlePeriod('next', 'month')}
                >
                  {`>>`}
                </th>
              </tr>

              <tr className="month">
                <th
                  className="change-period"
                  onClick={() => handlePeriod('prev', 'month')}
                >{`<`}</th>
                <th className="upper-first" colSpan={5}>
                  <FormattedMessage id={months[monthToday]} />
                </th>
                <th
                  className="change-period"
                  onClick={() => handlePeriod('next', 'month')}
                >{`>`}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="days-of-week-row">
                {daysOfWeek.map((day) => (
                  <td key={day} className="day-of-week upper-first">
                    <FormattedMessage id={day} />
                  </td>
                ))}
              </tr>
              {datesArray.map((line, index) => (
                <tr key={index} className="days-row">
                  {line.map((thisDate) => (
                    <td
                      key={thisDate.toString()}
                      className={`every-day  ${
                        activeDays
                          ?.map((day) => new Date(day).getDate())
                          .includes(thisDate.getDate()) &&
                        activeDays
                          ?.map((day) => new Date(day).getMonth())
                          .includes(thisDate.getMonth()) &&
                        activeDays
                          .map((day) => new Date(day).getFullYear())
                          .includes(thisDate.getFullYear())
                          ? 'active-date'
                          : thisDate < today
                          ? 'not-active'
                          : ''
                      }`}
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
