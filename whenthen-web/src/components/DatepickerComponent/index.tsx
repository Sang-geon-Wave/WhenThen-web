import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

interface PropsDatepickerComponent {}

const DateInformation = (now: Date, addMonth?: number) => {
  if (addMonth) now.setMonth(now.getMonth() + addMonth);
  let copy = new Date(now);

  copy.setDate(1);
  let first = new Date(copy);
  copy.setMonth(copy.getMonth() + 1);
  copy.setDate(0);
  let last = new Date(copy);

  return {
    date: now,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    offset: first.getDay(),
    daysInMonth: last.getDate(),
    totalSquares: first.getDay() - 1 + last.getDate() + (6 - last.getDay()),
  };
};
const DatepickerComponent: React.FunctionComponent<
  PropsDatepickerComponent
> = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [hidden, setHidden] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [date, setDate] = useState(DateInformation(new Date()));
  let squares = [];
  for (let i = 0; i < date.offset; i++) {
    squares.push(<div className={`${styles.square} ${styles.empty}`}> </div>);
  }
  for (let i = 1; i <= date.daysInMonth; i++) {
    let copy = new Date(date.date);
    copy.setDate(i);
    squares.push(
      <div
        className={styles.square}
        onClick={() =>
          document
            .getElementById('datepicker-text')
            ?.setAttribute('value', copy.toLocaleDateString())
        }
      >
        {i}
      </div>,
    );
  }

  return (
    <div className={styles.datepicker}>
      <input
        type="text"
        id="datepicker-text"
        onClick={() => setHidden(!hidden)}
        readOnly
      />
      {!hidden && (
        <div className={styles.container}>
          <div className={styles.controller}>
            <div
              className={styles.arrowleft}
              onClick={() => {
                setDate(DateInformation(date.date, -1));
              }}
            >
              ≪
            </div>
            <div className={styles.monthyear}>
              <span className={styles.month}>{months[date.month]}</span>
              <span className={styles.year}>{date.year}</span>
            </div>
            <div
              className={styles.arrowright}
              onClick={() => {
                setDate(DateInformation(date.date, 1));
              }}
            >
              ≫
            </div>
          </div>
          <div className={styles.squares}>
            {days.map((day) => (
              <div className={`${styles.square} ${styles.day}`}>{day}</div>
            ))}
            {squares.map((square) => square)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatepickerComponent;
